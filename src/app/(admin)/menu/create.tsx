import { View, Text, StyleSheet, TextInput,Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '@/src/components/button'
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useInsertProduct, useProduct, useUpdateProduct } from '../../api/products';

const CreateProductScreen = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const { id: idString } = useLocalSearchParams(); 
    const id = parseFloat(typeof idString == 'string' ? idString : idString?.[0]);
    const isUpdating = !!id; 

    const { mutate: InsertProduct } = useInsertProduct();
    const { mutate: UpdateProduct } = useUpdateProduct();
    const { data: updatingProduct } = useProduct(id);

    const router = useRouter();

    useEffect(() => {
        if(updatingProduct) {
            setName(updatingProduct.name);
            setPrice(updatingProduct.price.toString());
            setImage(updatingProduct.image);

        }
    },[updatingProduct]);


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

     const onCreate = () => {
        if(!validateInput()){
            return;
        }

        
        //Save in the database
        InsertProduct({name, price: parseFloat(price), image},
    {
        onSuccess: () => {
            resetFilds();
            router.back();
        },
    });
        
     }

     const onSubmit = () => {
        if(isUpdating) {
            onUpdate(); 
        } else {
            onCreate();
        }
     }

     const onUpdate = () => {
        if(!validateInput()){
            return;
        }

        UpdateProduct({ id, name, price: parseFloat(price), image},
        {
            onSuccess: () => {
                resetFilds();
                router.back();
            },
        });
        
     }

     const onDelete = () => {
        console.warn("Deleteee!!!")
     }

     const confirmDelete = () => {
            Alert.alert('Confirm','Are you sure you want to delete this product?', [
                {
                    text: 'Cancel',
                },
                {
                    text:'Delete',
                    style: 'destructive',
                    onPress: onDelete,
                }
            ])
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
      <Stack.Screen options={{title: isUpdating ? 'Update Product' : 'Create Product'}} />
    
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
       <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Create'}/>
       {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
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
