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
// import EDIT_STORY from '../../graphql/mutations/storyEdit';

// const defaultStyle = { borderWidth: 1, marginHorizontal: 50 };
// const defaultTextStyle = { marginHorizontal: 50 };

// class EditStory extends Component {
//   static getDerivedStateFromProps = (props, state) => ({
//     name: state.name || props.name,
//     description: state.description || props.description,
//     isActive: state.isActive !== undefined ? state.isActive : props.isActive,
//   });

//   state = {
//     name: undefined,
//     description: undefined,
//     isActive: undefined,
//   };

//   handleUpdateStory = async () => {
//     const { client, _id, componentId } = this.props;
//     const { name, description, isActive } = this.state;
//     const optimisticResponse = {
//       __typename: 'Mutation',
//       storyEdit: {
//         __typename: 'Story',
//         _id,
//         name,
//         description,
//         isActive,
//         createdAt: new Date(),
//       },
//     };
//     await client.mutate({
//       variables: {
//         storyId: _id,
//         data: {
//           name,
//           description,
//           isActive,
//         },
//       },
//       mutation: EDIT_STORY,
//       optimisticResponse,
//     });
//     Navigation.pop(componentId);
//   };

//   render() {
//     const { name, description, isActive } = this.state;
//     return (
//       <SafeAreaView style={{ flex: 1 }}>
//         <KeyboardAvoidingView style={{ flex: 1 }}>
//           {/* <OfflineNotice /> */}
//           <View style={{ flex: 0.8 }}>
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
//           <Button onPress={this.handleUpdateStory} title="Update" />
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     );
//   }
// }

// EditStory.propTypes = {
//   client: PropTypes.instanceOf(Object).isRequired,
//   _id: PropTypes.string.isRequired,
// };

// export default withApollo(EditStory);
