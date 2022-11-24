import { useNavigation } from '@react-navigation/core'
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../hooks/useAuth';
import Swiper from "react-native-deck-swiper";
import Navbar from '../assets/navbar';
import { onSnapshot, doc, collection, setDoc, query, where, getDocs, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "../config";
import generateId from '../lib/generateId';

const HomeScreen = () => {
    
    const navigation = useNavigation();
    const { user } = useAuth();
    const [profiles, setProfiles] = useState({});
    const swipeRef = useRef(null);

  useLayoutEffect(
    () => 
    onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.navigate("Modal");
      }
    }),
    []);

    useEffect(() => {
      let unsub;

      const fetchCards = async () => {

        const passes = await getDocs(collection(db, "users", user.uid, "passes")).then(
          (snapshot) => snapshot.docs.map(doc => doc.id)
        );

        const swipes = await getDocs(collection(db, "users", user.uid, "matches")).then(
          (snapshot) => snapshot.docs.map(doc => doc.id)
        );

        const passedUserIds = passes.length > 0 ? passes : ['test'];
        const swipesUserIds = swipes.length > 0? swipes : ['test'];

        console.log([...passedUserIds, ...swipesUserIds]);

        unsub = onSnapshot(query(collection(db, "users"), where("id", "not-in", [...passedUserIds, ...swipesUserIds]), ), (snapshot) => {
          setProfiles(
            snapshot.docs.filter((doc) => doc.id !== user.uid).map(doc => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
        })
      }
      fetchCards();
      return unsub;
    }, [db])

    const swipeLeft = async(cardIndex) =>{
      if(!profiles[cardIndex])return;
      const userSwiped = profiles[cardIndex];
      console.log('You swiped PASS on ${userSwiped.displayName}');

      setDoc(doc(db, "users", user.uid, "passes", userSwiped.id),
      userSwiped);
    };

    const swipeRight= async(cardIndex) =>{
      if(!profiles[cardIndex])return;
      const userSwiped = profiles[cardIndex];
      const loggedInProfile = await (
        await getDoc(doc(db,'users',user.uid))
      ).data();
      console.log('You swiped MATCH on ${userSwiped.displayName}');

      getDoc(doc(db,'users',userSwiped.id,'matches',user.uid)).then(
        (documentSnapshot) => {
            if(documentSnapshot.exists()){
              setDoc(doc(db, "users", user.uid, "matches", userSwiped.id),
              userSwiped
              );

              setDoc(doc(db,'pairs', generateId(user.uid,userSwiped.id)), {
                users: {
                  [user.uid]: loggedInProfile,
                  [userSwiped.id]: userSwiped
                },
                usersPairs: [user.uid,userSwiped.id],
                timestamp: serverTimestamp(),
              });

              navigation.navigate("Match", {
                loggedInProfile, 
                userSwiped,
              });

            }else{
              setDoc(doc(db, "users", user.uid, "matches", userSwiped.id),
              userSwiped
              );
            }
        }
      );

      setDoc(doc(db, "users", user.uid, "matches", userSwiped.id),
      userSwiped);
 
    };
    

    return (
    <SafeAreaView style={{ flex: 1}}>
      {/* Header */}
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
        <Text style={styles.text}> DISCOVER </Text>
        </TouchableOpacity>
      </View>
      {/* End of Header */}
      {/* Cards */}
      <View style={{flex:1, marginTop:-6 }}>
      <Swiper
        ref={swipeRef}
        stackSize={5}
        cardIndex={0}
        verticalSwipe={false}
        animateCardOpacity
        containerStyle={{backgroundColor: "transparent"}}
        cards={profiles}
        onSwipedLeft={(cardIndex) => {
          console.log('Swipe PASS');
          swipeLeft(cardIndex);
        }}
        onSwipedRight={(cardIndex) => {
          console.log("Swipe MATCH");
          swipeRight(cardIndex);
        }}
        overlayLabels={{
          left: {
            title: "NOPE",
            style: {
              label: {
                textAlign: "right",
                color: "red"
              },
            },
          },
          right: {
            title: "MATCH",
            style: {
              label: {
                color: "#4DED30"
              }
            }
          }
        }}
        renderCard={(card) => card ? (
          <View 
          key={card.id} 
          style={{ height:600, borderRadius: 20, marginTop:-20 }}
          >
            <Image 
            style={{ height:"100%", width:"100%", borderRadius: 20}} 
            source={{uri: card.image}}
            />
            <View style={[{ width:"100%", height:80, marginTop:-100, justifyContent:"space-between", alignContent:"space-between", paddingLeft:15, paddingTop:2}, styles.cardShadow] }>
              <View>
                <Text style={styles.name}>{card.name}, {card.age}</Text>
                <Text style={styles.bio}>{card.bio}</Text>
              </View>
            </View>
          </View>
         ) : (
            <View
            style={[
              styles.endCard, styles.cardShadow,
            ]}
            >
              <Text style={{fontWeight:"bold"}}> No More Profiles</Text>
              <Image 
              style={{height:20, width:"100%"}}
              height={100}
              width={100}
              source={{ uri: "https://images.emojiterra.com/google/android-oreo/512px/1f64f.png"}}    
              />
            </View>
            )
          }
        
        />
        </View>

  
      {/* End Cards */}
        
      <View>
      <TouchableOpacity
                onPress={() => navigation.navigate('Chat')}
                style={styles.button}>

                <Text style={{fontWeight: 'bold', fontSize:18, color:'white'}}>GO to Chat</Text>
            </TouchableOpacity>
    </View>

    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  text: {
    marginTop:7,fontSize:50, height:80,
        textAlign:'center',

  },
  name: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 15,
    color: 'white',
    lineHeight: 25,

  },
  cardShadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity:  0.21,
    shadowRadius: 7.68,
    elevation: 10
  },
  endCard: {
    backgroundColor: "white",
    height: "75%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  button:{
    marginTop:200, marginBottom:15, marginLeft: 120,
    height:50,
    width:180,
    backgroundColor:'#4C3575',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50,
}
})