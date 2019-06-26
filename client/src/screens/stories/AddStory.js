// /* eslint-disable no-underscore-dangle */
// import React, { Component } from 'react';
// import {
//   View,
//   TextInput,
//   Switch,
//   SafeAreaView,
//   Text,
//   Button,
//   KeyboardAvoidingView,
// } from 'react-native';
// import PropTypes from 'prop-types';
// import { withApollo } from 'react-apollo';
// import { Navigation } from 'react-native-navigation';
// import uuidv4 from 'uuid/v4';
// import ADD_STORY from '../../graphql/mutations/storyCreate';
// import QUERY_STORIES from '../../graphql/queries/queryStories';

// const defaultStyle = { borderWidth: 1, marginHorizontal: 50 };
// const defaultTextStyle = { marginHorizontal: 50 };

// class AddStory extends Component {
//   state = {
//     name: '',
//     description: '',
//     isActive: false,
//   };

//   handleAddStory = async () => {
//     const { client, componentId } = this.props;
//     const { name, description, isActive } = this.state;
//     const optimisticResponse = {
//       __typename: 'Mutation',
//       storyCreate: {
//         __typename: 'Story',
//         _id: uuidv4(),
//         name,
//         description,
//         isActive,
//         createdAt: new Date().toJSON(),
//       },
//     };
//     await client.mutate({
//       variables: {
//         data: {
//           name,
//           description,
//           isActive,
//         },
//       },
//       mutation: ADD_STORY,
//       optimisticResponse,
//       update: (cache, { data: { storyCreate } }) => {
//         const { stories } = cache.readQuery({
//           query: QUERY_STORIES,
//           variables: { filters: {}, options: {} },
//         });
//         stories.push(storyCreate);
//         cache.writeQuery({
//           query: QUERY_STORIES,
//           variables: { filters: {}, options: {} },
//           data: { stories },
//         });
//       },
//       context: {
//         type: 'isCreate',
//         replaceId: 'storyId',
//       },
//     });
//     Navigation.pop(componentId);
//   };

//   render() {
//     const { name, description, isActive } = this.state;
//     return (
//       <SafeAreaView style={{ flex: 1 }}>
//         <KeyboardAvoidingView style={{ flex: 1 }}>
//           <View>
//             <Text style={defaultTextStyle}> Name</Text>
//             <TextInput
//               style={defaultStyle}
//               onChangeText={text => this.setState({ name: text })}
//               keyboard="email-address"
//               placeholder="Name"
//               editable
//               value={name}
//             />
//             <Text style={defaultTextStyle}> Description</Text>
//             <TextInput
//               style={defaultStyle}
//               onChangeText={text => this.setState({ description: text })}
//               multiline
//               editable
//               placeholder="Description"
//               keyboard="default"
//               secureTextEntry
//               value={description}
//             />
//             <Text>Is active ?</Text>
//             <Switch value={isActive} onValueChange={value => this.setState({ isActive: value })} />
//           </View>
//           <Button onPress={this.handleAddStory} title="Add" />
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     );
//   }
// }

// AddStory.propTypes = {
//   client: PropTypes.instanceOf(Object).isRequired,
// };

// export default withApollo(AddStory);
