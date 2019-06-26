// /* eslint-disable no-underscore-dangle */
// import React from 'react';
// import { SafeAreaView, Text, FlatList, View, TouchableHighlight, StyleSheet } from 'react-native';
// import { Query, withApollo } from 'react-apollo';
// import PropTypes from 'prop-types';
// import { Navigation } from 'react-native-navigation';
// import QUERY_STORIES from '../../graphql/queries/queryStories';
// import StoryItem from './StoryItem';
// import StoryItemSeparator from './StoryItemSeparator';
// import OfflineNotice from '../../common/NetworkConnectivity';
// import { ADD_STORY_SCREEN } from '../../helpers/setScreens';

// const styles = StyleSheet.create({
//   container: {
//     flex: 0.05,
//     backgroundColor: '#aaa',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//     width: '100%',
//   },
// });
// const handleAddStory = componentId => {
//   Navigation.push(componentId, {
//     component: {
//       name: ADD_STORY_SCREEN,
//     },
//   });
// };

// const Stories = ({ componentId, client }) => {
//   const filters = {};
//   const options = {};
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <OfflineNotice />
//       <View style={{ flex: 0.85 }}>
//         <Query query={QUERY_STORIES} variables={{ filters, options }} context={{ isQuery: true }}>
//           {({ loading, data, error }) => {
//             if (loading) return <Text>loading</Text>;
//             if (error) return <Text>{error.message}</Text>;
//             if (data.stories) {
//               return (
//                 <FlatList
//                   data={data.stories}
//                   keyExtractor={item => item._id}
//                   renderItem={({ item }) => <StoryItem componentId={componentId} item={item} />}
//                   ItemSeparatorComponent={() => <StoryItemSeparator />}
//                 />
//               );
//             }
//             return <Text>There is no data to show</Text>;
//           }}
//         </Query>
//       </View>
//       <TouchableHighlight style={styles.container} onPress={() => handleAddStory(componentId)}>
//         <Text>ADD STORY</Text>
//       </TouchableHighlight>
//       <TouchableHighlight style={styles.container} onPress={() => client.resetStore()}>
//         <Text>RESET STORE</Text>
//       </TouchableHighlight>
//     </SafeAreaView>
//   );
// };

// Stories.propTypes = {
//   componentId: PropTypes.string.isRequired,
//   client: PropTypes.instanceOf(Object).isRequired,
// };

// export default withApollo(Stories);
