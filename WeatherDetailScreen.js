import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {Constants} from 'expo';
import Animation from './Animation.js';
import bg from './assets/bg/today_weather_mist_bg.jpg'

export default class WeatherDetailScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: `현재 ${navigation.getParam('city', 'Unknown')} 날씨`,
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
            isLoading: true,
        };
    }

    componentDidMount() {
        const {navigation} = this.props;
        const city = navigation.getParam('city', null);
        // const city = 'Daejeon';

        fetch(`http://192.168.100.118:8080/weather-crawler/current-weathers/by-city-name/${city}`) // change to ur IP
            .then(response => response.json())
            .then(info => {
                this.setState({
                    ...info,
                    isLoading: false,
                });
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Text>데이터를 불러오는 중입니다.</Text>
                </View>
            )
        }

        let celsius = this.state.main.temp - 273.15;
        let max_celsius = this.state.main.temp_max - 273.15;
        let min_celsius = this.state.main.temp_min - 273.15;
        let humidity = this.state.main.humidity + "%";
        let state = this.state.weather[0].main;
        let wind = parseFloat(this.state.wind.speed);
        console.log(this.state.weather[0].icon);
        let windchill = 13.12 + (0.6215 * celsius) - 11.37 * (wind ** 0.16) + 0.3965 * celsius * (wind ** 0.16);
        let current_temp_head = ['현재온도', '체감온도'];
        let current_temp_body = [celsius.toFixed(1), windchill.toFixed(1)];
        let min_max_temp_head = ['최저온도', '최고온도'];
        let min_max_temp_body = [min_celsius.toFixed(1), max_celsius.toFixed(1)];

        return (
            <ImageBackground source={bg} style={[{width: '100%', height: '100%'}, styles.container]}>
                <View style={styles.overlay}>
                </View>
                <Text style={styles.title}>{this.state.name}</Text>
                <Animation path={this.state.weather[0].icon} state={state}/>
                <Text style={[{marginBottom: 5,marginLeft: 5},styles.text]}>습도: {humidity}</Text>
                <Table borderStyle={styles.table}>
                    <Row style={styles.head} textStyle={styles.temp_title} data={current_temp_head}></Row>
                    <Row textStyle={styles.temp} data={current_temp_body}></Row>
                    <Row style={styles.head} textStyle={styles.temp_title} data={min_max_temp_head}></Row>
                    <Row textStyle={styles.temp} data={min_max_temp_body}></Row>
                </Table>

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        justifyContent: 'space-between',
        overlayColor: '#22222260',
    },
    title: {
        marginTop: 15,
        fontSize: 50,
        textAlign: 'center',
        color: '#fff',
        elevation: 5,
    },
    text: {
        fontSize: 20,
        color: '#fff',
    },
    table: {
        borderWidth: 5,
        borderColor: '#ffffff10',
    },
    head: {
        backgroundColor: '#808B9750',

    },
    temp_title: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        opacity: 1,
    },
    temp: {
        textAlign: 'center',
        fontSize: 35,
        padding: 20,
        color: '#fff',
    },
    center: {
        textAlign: 'center',
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
    }
});