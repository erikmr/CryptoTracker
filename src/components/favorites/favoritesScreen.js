import React ,{Component} from 'react'
import { View,FlatList, StyleSheet, Text } from 'react-native'
import FavoritesEmptyState from './favoritesEmptyState'
import Colors from '../../res/colors'
import Storage from '../../libs/storage'
import CoinsItem from '../coins/CoinsItem'

class FavoritesScreen extends Component{
    state = {
        favorites:[]
    }
    getFavorites = async()=>{
        try{
            const allKeys = await Storage.instance.getAllKeys()
            const keys = allKeys.filter((key)=>{return key.includes("favorite-")})
            const favs = await Storage.instance.multiGet(keys)
            const favorites = favs.map((fav)=>JSON.parse(fav[1]))
            console.log(favorites)
            this.setState({favorites})

        }catch(err){
            console.log("getfavorites err", err)
        }
    }

    componentDidMount(){
        this.getFavorites()
        this.props.navigation.addListener("focus",this.getFavorites)
    }
    componentWillUnmount(){
        this.props.navigation.removeListener("focus",this.getFavorites)
    }
    handlePress = (coin) => {
        this.props.navigation.navigate("Coin Detail",{coin})
    }
    render(){
        const {favorites} = this.state
        return(
            <View style={styles.container}>
                {
                    favorites.length == 0?<FavoritesEmptyState />:null
                }
                {
                    favorites.length >0 ?
                        <FlatList 
                        data={favorites}
                        renderItem={({item})=>  
                            <CoinsItem 
                                item={item}
                                onPress={()=>{ this.handlePress(item)} }
                            />}
                        
                        />
                    :null
                }
                                
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.charade

    }
})
export default FavoritesScreen