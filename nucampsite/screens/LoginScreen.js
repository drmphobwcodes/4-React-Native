import { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { CheckBox, Input } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const handleLogin = () => {
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`); 
        console.log(`Remember: ${remember}`);

        SecureStore.setItemAsync(
            'userinfo',
            JSON.stringify({
                username,
                password
            })
        ).catch(error => console.log('Could not save user info', error));

        if (remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify({ username, password })).catch(
                error => console.log('Could not save user info', error)
            );
        } else {
            SecureStore.deleteItemAsync('userinfo').catch(error =>
                console.log('Could not delete user info', error)
            );
        }
    };

    useEffect(() => {
        SecureStore.getItemAsync('userinfo').then(userdata => {
            const userinfo = JSON.parse(userdata);
            if (userinfo) {
                setUsername(userinfo.username);
                setPassword(userinfo.password);
                setRemember(true);
            }
        });
    }, []);

return (
    <View style={styles.container}>
        <Input
            placeholder='Username'
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            onChangeText={username => setUsername(username)}
            value={username}
            containerStyle={styles.formInput}
        />
        <Input
            placeholder='Password'
            leftIcon={{ type: 'font-awesome', name: 'key' }}
            onChangeText={password => setPassword(password)}
            value={password}
            containerStyle={styles.formInput}
        />
        <CheckBox
            title='Remember Me'
            checked={remember}
            center
            onPress={() => setRemember(!remember)}
            containerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
            <Button
                onPress={() => handleLogin()}
                title='Login'
                color='#512DA8'
            />
        </View>
        <View style={styles.formButton}>
            <Button
                onPress={() => navigation.navigate('Register')}
                title='Register'
                clear
                color='#512DA8'
            />
        </View>
    </View>
);
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    formInput: {
        padding: 10,
    },
    formIcon: {
        marginRight: 10,
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null,
    },
    formButton: {
        margin: 40,
    },
});



export default LoginScreen;