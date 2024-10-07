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

      <Text style={ styles.title }>{product.name}</Text>
      <Text style={ styles.price }>${product.price}</Text>
      
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
  
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
   
  },
  
})

export default ProductDetailScreen;