import React from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Constants} from 'expo';

export default class CityList extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: `2조 날씨앱`,
            headerStyle: {
                backgroundColor: '#393E42',
            },
            headerTitleStyle: {
                color: '#fff',
            }
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            cities: [],
            cityList: [],
            search: "",
        };
    }

    updateSearch = search => {
        this.setState({search});
        if (search == "") {
            this.state.cityList = this.state.cities;
        } else {
            this.state.cityList = this.state.cities.filter(item  => item.toLowerCase().search(search.toLowerCase()) >= 0 );
        }
    };

    componentDidMount() {
        fetch('http://192.168.100.118:8080/weather-crawler/available-cities') // change to ur IP
            .then(response => response.json())
            .then(cities => {
                console.log('cities =', cities.length);
                this.setState({
                    cities : cities,
                    cityList : cities
                });
            });
    }

    onPressCity(item) {
        console.log('onPressCity =', item);
        this.props.navigation.navigate(
            'Detail',
            {
                city: item
            }
        );
    }

    renderItem(city) {
        return (
            <TouchableOpacity style={styles.item} onPress={() => this.onPressCity(city)}>
                <Text style={styles.leftAlign}>{city[0]}</Text>
                <Text style={styles.text}>{city}</Text>

            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBar containerStyle={{borderBottomColor: '#303338', borderTopColor: '#303338'}} placeholder="Search..."
                           onChangeText={this.updateSearch}
                           value={this.state.search}/>
                <FlatList
                    renderItem={({item}) => this.renderItem(item)}
                    keyExtractor={item => item}
                    data={this.state.cityList}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#393E42',

    },

    item: {
        flex: 1,
        height: 70,
        justifyContent: 'flex-start',

        flexDirection: 'row',

        borderWidth: 1,
        borderColor: '#303338',
    },
    text: {
        flexWrap: 'wrap',
        alignSelf: 'center',
        fontSize: 20,
        color: '#fff'
    },
    leftAlign: {
        flexWrap: 'wrap',
        alignSelf: 'center',
        textAlign: 'center',
        width: 90,
        paddingLeft: 35,
        paddingRight: 35,
        fontSize: 30,
        color: '#fff'
    }
});