import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import {faBookmark} from '@fortawesome/free-solid-svg-icons/faBookmark';
import {faComment} from '@fortawesome/free-solid-svg-icons/faComment';
import {faShareNodes} from '@fortawesome/free-solid-svg-icons/faShareNodes';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Card = ({data}) => {
    console.log(data.image[0][0].uri)
    const [like,setLike]=useState(false)
  return (
    <View
      style={{elevation: 2}}
      className="bg-white w-11/12 mx-auto h-auto my-2 rounded-md">
      <View style={{elevation: 2}} className="bg-teal-50 rounded-md">
        <Image
          className="w-full h-40 rounded-t-md"
          source={{
            uri:data?.image[0][0]?.uri
          }}
        />
        <View className="flex flex-row justify-between items-center mx-2">
          <View className="flex flex-row justify-evenly gap-4 items-center p-2">
            <TouchableOpacity onPress={()=>setLike(!like)}>

            <FontAwesomeIcon size={22} color={like?"red":"#d1d5db"} icon={faHeart} />
            </TouchableOpacity>
            <FontAwesomeIcon size={22} color="#d1d5db" icon={faComment} />
            <FontAwesomeIcon size={22} color="#d1d5db" icon={faShareNodes} />
          </View>
          <View>
            <FontAwesomeIcon size={22} color="#d1d5db" icon={faBookmark} />
          </View>
        </View>
        <View>
            <Text style={{fontFamily:"Poppins-Regular"}} className="text-gray-700 text-xs p-2">
            {data.comment}
            </Text>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  gradient: {},
});
