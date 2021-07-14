import { BackgroundColor } from 'chalk';
import React, { Component } from 'react';
import { View,Text,Image, StyleSheet,SectionList} from 'react-native';
import Colors from '../../res/colors'


class CoinDetailScreen extends Component {
    state = {
        coin: {}
    }

    getSymbolIcon = (nameStr) => {
        if (nameStr) {
          const name = nameStr.toLowerCase().replace(' ', '-');
          return `https://c1.coinlore.com/img/25x25/${name}.png`;
        }
    };
    getSections = (coin) => {
        const data = [
          {
            title: 'Market Cap',
            data: [coin.market_cap_usd],
          },
          {
            title: 'Volume 24hr',
            data: [coin.volume24],
          },
          {
            title: 'Change 24hr',
            data: [coin.percent_change_24h],
          },
        ];
        return data;
      };

    componentDidMount(){
        const { coin } = this.props.route.params
        this.props.navigation.setOptions({title: coin.symbol} )
        this.setState({coin})
    }
    
    render(){
        const { coin } = this.state
        return(
            <View style={styles.container}>
                <View style={styles.subHeader}> 
                    <Image 
                        style={styles.iconImg}
                        source={{ uri:this.getSymbolIcon(coin.name)}}
                    />
                    <Text style={styles.titleText}>{coin.name}</Text>
                </View>
                <View style={styles.sectionList}>
                <SectionList
                    sections={this.getSections(coin)}
                    keyExtractor={(item) => item}
                    renderItem={({item}) =>
                        <View style={styles.sectionItem}>
                        <Text style={styles.itemText}>{item}</Text>
                        </View>
                    }
                    renderSectionHeader={({section}) =>
                        <View style={styles.sectionHeader}>
                        <Text style={styles.sectionText}>{section.title}</Text>
                        </View>
                    }
                    />
                </View>                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.charade,
      flex: 1,
    },
    subHeader: {
      backgroundColor: 'rgba(0,0,0, 0.1)',
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
      fontSize: 25,
      fontWeight: 'bold',
      marginLeft: 8,
      color: Colors.white,
      textAlign: 'center',
    },
    iconImg: {
      width: 35,
      height: 35,
    },
    sectionList: {
      flex: 1,
      justifyContent: 'center',
    },
    sectionHeader: {
      backgroundColor: 'rgba(0,0,0, 0.2)',
      padding: 8,
    },
    sectionItem: {
      padding: 8,
    },
    sectionText: {
      color: Colors.white,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    itemText: {
      color: Colors.white,
      fontSize: 16,
      textAlign: 'center',
    },
  });
export default CoinDetailScreen;