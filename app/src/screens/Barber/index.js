import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import Stars from '../../components/Stars';

import FavoriteIcon from '../../assets/favorite.svg';
import BackIcon from '../../assets/back.svg';

import {
    Container,
    Scroller,

    SwipeDot,
    SwipeDotActive,
    SwipeItem,
    SwipeImage,
    FakeSwiper,

    PageBody,
    UserInfoArea,
    UserAvatar,
    UserInfo,
    UserInfoName,
    UserFavButton,

    LoadingIcon,
    ServiceArea,
    TestimonialArea,
    BackButton

} from './styles';

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

    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        const getBarberInfo = async () => {
            setLoading(true);

            let json = await Api.getBarber(userInfo.id);
            if (json.error == '') {
                setUserInfo(json.data);
            } else {
                alert("Erro: "+ json.error);
            }

            setLoading(false);
        }
    }, []);

    const handleBackButton = () => {
        navigation.goBack();
    };

    return(
        <Container>
            <Scroller>
                {userInfo.photos && userInfo.photos.length > 0 ?
                    <Swiper
                        style={{height: 240}}
                        dot={<SwipeDot />}
                        activeDot={<SwipeDotActive />}
                        paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
                        autoplay={true}
                    >
                        {userInfo.photos.map((item, key)=>(
                            <SwipeItem key={key}>
                                <SwipeImage source={{uri:item.url}} resizeMode="cover" />
                            </SwipeItem>
                        ))}
                    </Swiper>
                    :
                    <FakeSwiper>

                    </FakeSwiper>
                }
                <PageBody>
                    <UserInfoArea>
                        <UserAvatar source={{uri:userInfo.avatar}} />
                        <UserInfo>
                            <UserInfoName> {userInfo.name} </UserInfoName>
                            <Stars stars={userInfo.stars} showNumber={true} />
                        </UserInfo>
                        <UserFavButton>
                            <FavoriteIcon width="24" height="24" fill="#FF0000"/>
                        </UserFavButton>
                    </UserInfoArea>

                    {loading && 
                        <LoadingIcon size="large" color="#000" />
                    }

                    <ServiceArea>
                        <ServicesTitle>Lista de Serviços</ServicesTitle>

                        {userInfo.services.map((item, key)=> (
                            <ServiceItem>
                                
                            </ServiceItem>
                        ))}
                    </ServiceArea>

                    <TestimonialArea>

                    </TestimonialArea>
                </PageBody>
            </Scroller>
            <BackButton onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF" />
            </BackButton>
        </Container>
    );
}