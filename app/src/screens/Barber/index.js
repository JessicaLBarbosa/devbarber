import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {Container} from './styles';

import Api from '../../Api';

export default () => {

    const navigation = useNavigation();
    const routes = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: routes.params.id, 
        avatar: routes.params.avatar,
        name: routes.params.name,
        stars: routes.params.stars
    });

    useEffect(()=> {
        const getBarberInfo = async () => {
            let json = await Api.getBarber(userInfo.id);
            if (json.error == '') {
                
            } else {
                alert("Erro: "+ json.error);
            }
        }
    }, []);

    return(
        <Container>
            <Text>Barbeiro: {userInfo.name}</Text>
        </Container>
    );
}