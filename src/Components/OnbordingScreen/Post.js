import { View, Text, TouchableOpacity ,Modal, TextInput, FlatList} from 'react-native'
import React, { useState ,useEffect} from 'react'
import Card from '../Card'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons/faPaperclip';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import Documentpicker from "react-native-document-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 





const Post = () => {
  const navigation = useNavigation(); 
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [Post,setPost]=useState([])


  const [postContent, setPostContent] = useState('');


  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const userString = await AsyncStorage.getItem('loggeduser');
        if (userString) {
          const user = JSON.parse(userString);
          setLoggedInUser(user);
          console.log(user);
        }
      } catch (error) {
        console.error('Error fetching logged-in user:', error);
      }
    };

    fetchLoggedInUser();
  }, []);

  const handleCreatePost = async () => {
    try {
      const existingPosts = JSON.parse(await AsyncStorage.getItem('posts')) || [];
      const newPost = {
        id: Math.random().toString(36).substr(2, 9),
        userId: loggedInUser.username,
        comment: postContent,
        likes: [],
        image: image,
        createdAt: new Date().toISOString(),
      };
  
      const updatedPosts = [newPost, ...existingPosts];
  
      await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
  
      setModalVisible(false);
    } catch (error) {
      console.error('Error while creating a post:', error);
    }
  };

  const picker = async () => {
    try {
      const doc = await Documentpicker.pick({
        type: [Documentpicker.types.images],
      });
      if (doc) {
        console.log(doc);
        setImage((prevImages) => [...prevImages, doc]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeImage = (index) => {
    setImage((prevImages) => prevImages.filter((_, i) => i !== index));
  };


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const userString = await AsyncStorage.getItem('posts');
        if (userString) {
          const user = JSON.parse(userString);
          setPost(user);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, []);



  return (
   <>
    <View className='bg-white flex-1 '>
    <View className="pb-16">

    <FlatList
    
  data={Post}
  keyExtractor={(item) => item.username}
  renderItem={({ item }) => (
    <Card data={item} />
  )}
/>
    </View>




    <TouchableOpacity onPress={()=>setModalVisible(true)} className="bg-teal-400 absolute bottom-4 w-4/5 left-8 right-8 h-8 rounded-lg">
      <Text style={{fontFamily:"Poppins-SemiBold"}} className="text-white text-center p-1">Create post</Text>

    </TouchableOpacity>
    </View>
       


    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>

        <View style={{backgroundColor:"rgba(0,0,0,0.5)"}} className="flex-1 justify-center items-center">
              <View className="absolute bg-white w-4/5 p-2 rounded-md">
                <View className="p-2 flex " >
                   <TextInput className="text-black p-2 border border-gray-200" placeholder='Type something.....'
                    placeholderTextColor={"gray"}
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={(text)=>setPostContent(text)}
                    verticalAlign='top'
                    textAlignVertical='top'
                  />
                  <View className="flex w-full justify-start  mt-4 items-center">
									<TouchableOpacity
										className="flex flex-row items-center gap-2"
										onPress={picker}
									>
										<FontAwesomeIcon
											color="rgb(45 212 191)"
											size={20}
											icon={faPaperclip}
										/>
										<Text
											style={{ fontFamily: "Poppins-Regular" }}
											className="text-teal-400 text-sm font-medium"
										>
											Attachment
										</Text>
									</TouchableOpacity>
                  {image && image.length > 0
									? image.map((item, index) => (
											<View className="bg-[#f1f5f9] h-12 mt-4 rounded-md flex flex-row justify-between items-center px-2 w-full">
												<View className="flex flex-row items-center gap-2">
													<View className="flex justify-center items-center bg-teal-400 h-10 w-10 rounded-md">
														<Text className="uppercase  text-xs text-white">
															{item.name && item.name.includes(".")
																? item.name.split(".").pop()
																: ""}
														</Text>
													</View>
													<View>
														<Text
															style={{ fontFamily: "Poppins-Italic" }}
															className="text-black"
														>
															{item.name && (
																<>
																	{item.name.length > 20 ? (
																		<>
																			{item.name.slice(0, 10)}...
																			{item.name.split(".").pop()}
																		</>
																	) : (
																		item.name
																	)}
																</>
															)}
														</Text>
													</View>
												</View>
												<View>
													<TouchableOpacity onPress={() => removeImage(index)}>
														<FontAwesomeIcon
															color="grey"
															size={20}
															icon={faXmark}
														/>
													</TouchableOpacity>
												</View>
											</View>
									  ))
									: null}

                  <TouchableOpacity
									className="h-12 w-full mt-4 self-center justify-center items-center bg-teal-400"
									style={{
										borderRadius: 8
									}}
									onPress={handleCreatePost}
								>
									
										<Text
											style={{ fontFamily: "Poppins-Regular" }}
											className="font-semibold text-lg text-white"
										>
											SUBMIT
										</Text>
							
								</TouchableOpacity>

								</View>
                </View>
              </View>
        </View>

</Modal>


   </>
  )
}

export default Post