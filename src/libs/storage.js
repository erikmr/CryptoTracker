import React from 'react'
import AsyncStorage
from '@react-native-async-storage/async-storage';
class Storage {
    static instance = new Storage()

    store = async(key,value) =>{
        console.log(key)
        try{
            await AsyncStorage.setItem(key,value)
            return true
        }catch(err){
            console.log(err)
            return false
        }
    }
    get = async(key)=>{
        try{
            return await AsyncStorage.getItem(key)
        }catch(err){
            console.log(err)
            throw Error(err)
        }
    }
    remove = async(key)=>{
        try{
             await AsyncStorage.removeItem(key)
             return true
        }catch(err){
            console.log(err)
            return false
        }
    }
    multiGet = async(keys)=>{
        try{
             return await AsyncStorage.multiGet(keys)
             
        }catch(err){
            console.log(err)
            throw Error(err)
        }
    }
    getAllKeys = async()=>{
        try{
            return await AsyncStorage.getAllKeys()
             
        }catch(err){
            console.log(err)
            throw Error(err)
        }
    }
}
export default Storage
