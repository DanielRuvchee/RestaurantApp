import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { title } from 'process';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from 'react';
import Button  from '@/src/components/button';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';
import { useRoute } from '@react-navigation/native';

const sizes: PizzaSize[] =['S','M','L','XL'];

const ProductDetailScreen = () => {

  const { id } = useLocalSearchParams();

  const {addItem} = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  const product = products.find((p) => p.id.toString() == id)

  const addToCart = () => {
    if(!product) {
      return;
    }
    addItem(product, selectedSize)
    router.push('/cart')
  }

  if(!product) {
    return <Text>Product not found</Text>
  }
  return (

    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image || defaultPizzaImage}}
       style={styles.Image}/>

       <Text>Select size:</Text>
       <View style={styles.sizes}>
       {sizes.map((size)=>(
        <Pressable 
        onPress={() => {
          setSelectedSize(size)
        }}
        style={[
          styles.size,
          {
            backgroundColor: selectedSize == size ? 'gainsboro' : 'white',
          }
          ]} key={size}>
        <Text style={[styles.sizeText,
          {
            color: selectedSize == size ? 'black' : 'gray',
          }
        ]}>{size}</Text>
        </Pressable>
       ))}
      </View>
      <Text style={ styles.price }>${product.price}</Text>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  )
}

const styles = StyleSheet.create({
  container:  {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,

  },
  Image: {
    width: '100%',
    aspectRatio: 1,

  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginTop: 'auto',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 25,
  },
  sizeText: {
    fontSize: 18,
    fontWeight: '500',

  }
})

export default ProductDetailScreen;