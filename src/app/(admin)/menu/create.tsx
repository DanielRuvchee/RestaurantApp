import { View, Text, StyleSheet, TextInput,Image } from 'react-native'
import React, { useState } from 'react'
import Button from '@/src/components/button'
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';

const CreateProductScreen = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const resetFilds = () => {
        setName('');
        setPrice('')
     }

     const validateInput = () => {
        setErrors('');
        if(!name) {
            setErrors("Name is required");
            return false;
        }
        if(!price) {
            setErrors("Price is required");
            return false;
        }
        if(isNaN(parseFloat(price))) {
            setErrors("Price is not a number");
            return false;
        }
        return true;
     }

     const onCreate =() => {
        if(!validateInput()){
            return;
        }

        console.warn("Creating product",name, price)
        //Save in the database
        resetFilds();
     }

     const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    }
    

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: 'Create Product'}} />
    
      <Image source={{ uri: image || defaultPizzaImage }} style={styles.image}/>
      <Text onPress={pickImage} style={styles.textButton}>Select image</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
         placeholder='Name'
        style={styles.input}/>

      <Text style={styles.label}>Price($)</Text>
      <TextInput
       placeholder='9,99$'
       value={price}
       onChangeText={setPrice}
       style={styles.input}
       keyboardType='numeric'
       />

        <Text style={{color: 'red'}}>{errors}</Text>
       <Button onPress={onCreate} text='Create' />
    </View>
  )
}

export default CreateProductScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    label: {
        color: 'gray',
        fontSize: 16,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    }
})
