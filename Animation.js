import React from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';
import Animation from 'lottie-react-native';

import clear_sky from './assets/icon/clear_sky'
import few_clouds from './assets/icon/few_clouds'
import lightning from './assets/icon/lightning'
import mist from './assets/icon/mist'
import rain from './assets/icon/rain'
import scattered_clouds from './assets/icon/scattered_clouds'
import shower_rain from './assets/icon/shower_rain'
import snow from './assets/icon/snow'

export default class lottieloader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            path: clear_sky,
            state: props.state,
        };
    }

    componentDidMount() {
        let path = clear_sky;
        switch (this.props.path) {
            case "01d":
            case "01n":
                path = clear_sky;
                break;
            case "02d":
            case "02n":
                path = few_clouds;
                break;
            case "03d":
            case "03n":
            case "04d":
            case "04n":
                path = scattered_clouds;
                break;
            case "09d":
            case "09n":
                path = shower_rain;
                break;
            case "10d":
            case "10n":
                path = rain;
                break;
            case "11d":
            case "11n":
                path = lightning;
                break;
            case "13d":
            case "13n":
                path = snow;
                break;
            case "50d":
            case "50n":
                path = mist;
                break;
        }
        // console.log(this.states);
        this.setState({
            path: path,
        });

        this.animation.play();
    }

    render() {
        return (
            <View style={styles.container}>
                <Animation
                    ref={animation => {
                        this.animation = animation;
                    }}
                    style={{
                        width: 220,
                        height: 220,
                        marginTop: 5,
                    }}
                    loop={true}
                    source={this.state.path}
                />
                <Text style={[styles.text, styles.center]}>{this.state.state}</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    center:{
        textAlign: 'center',
    },
    text : {
        fontSize: 25,
        color: '#fff',
        top: -20
    },
});