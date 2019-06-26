import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList
} from "react-native";
import ImagePicker from "react-native-image-picker";
import { ReactNativeFile } from "apollo-upload-client";
import { withApollo, Query } from "react-apollo";
import uuidv4 from "uuid/v4";
import UPLOAD_MUTATION from "../../graphql/mutations/uploadFile";
import StoryItemSeparator from "../stories/StoryItemSeparator";
import queryUploads from "../../graphql/queries/queryUploads";
import OfflineNotice from "../../common/components/NetworkConnectivity";
// More info on all the options is below in the API Reference... just some common use cases shown here

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  uploadAvatar: {
    width: 150,
    height: 150
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  }
});

class NewPost extends Component {
  handleUpload = async response => {
    const { client } = this.props;
    const file = new ReactNativeFile({
      uri: response.uri,
      name: response.fileName,
      type: response.type
    });
    const optimisticResponse = {
      __typename: "Mutation",
      singleUpload: {
        __typename: "File",
        _id: uuidv4(),
        filename: response.fileName,
        mimetype: response.type,
        path: response.uri,
        createdAt: new Date()
      }
    };
    await client.mutate({
      mutation: UPLOAD_MUTATION,
      variables: { file },
      optimisticResponse,
      update: (cache, { data: { singleUpload } }) => {
        const { uploads } = cache.readQuery({
          query: queryUploads,
          variables: { filters: {}, options: {} }
        });
        console.log("uploads", uploads);
        uploads.push(singleUpload);
        cache.writeQuery({
          query: queryUploads,
          variables: { filters: {}, options: {} },
          data: { uploads }
        });
      },
      context: {
        type: "isUpload",
        replaceId: ""
      }
    });
  };

  takePicture = async () => {
    ImagePicker.showImagePicker(response => {
      console.log("RESPONSE", response);
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        this.handleUpload(response);
      }
    });
  };

  render() {
    const filters = {};
    const options = {};
    return (
      <View style={styles.container}>
        <OfflineNotice />
        <View
          style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
        >
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
        <Query
          query={queryUploads}
          variables={{ filters, options }}
          context={{ isQuery: true }}
        >
          {({ loading, data, error }) => {
            console.log("{ loading, data, error }", { loading, data, error });
            if (loading) return <Text>loading</Text>;
            if (error) return <Text>{error.message}</Text>;
            if (data.uploads) {
              return (
                <FlatList
                  data={data.uploads}
                  keyExtractor={item => item._id}
                  renderItem={({ item }) => {
                    console.log("item", item);
                    return (
                      <Image
                        source={{ uri: item.path }}
                        style={styles.uploadAvatar}
                      />
                    );
                  }}
                  ItemSeparatorComponent={() => <StoryItemSeparator />}
                />
              );
            }
            return <Text>There is no data to show</Text>;
          }}
        </Query>
      </View>
    );
  }
}

export default withApollo(NewPost);
