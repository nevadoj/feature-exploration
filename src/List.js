import { StyleSheet, View, Text, TouchableOpacity, FlatList, Switch } from 'react-native';
import { useState } from 'react';
import { LinearTransition, FadeIn, FadeOutDown, FadeInUp, FadeOut, FadeInDown } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

export default function List() {
    const [data, setData] = useState([]);
    const [animation, setAnimation] = useState(false);

    const generateUniqueNumber = () => {
        const newNumber = Math.floor(Math.random() * 1000);
        setData([...data, {id: Date.now().toString(), text: newNumber}]);
    };

    const deleteItem = (id) => {
        setData(data.filter((item) => item.id !== id));
    }

    const toggle = () => {
        setAnimation(prevState => !prevState);
    }

    return (
        <Animated.View style={styles.container}>
            <Text style={styles.title}>List</Text>

            <View style={styles.toggleContainer}>
                <Text style={styles.subtitle}>Toggle Animations</Text>
                <Switch value={animation} onValueChange={toggle}/>
            </View>

            <TouchableOpacity style={[styles.button, {marginTop: 36}]} onPress={() => generateUniqueNumber()}>
                <Text>Add item</Text>
            </TouchableOpacity>

            <Animated.View 
                style={{marginTop: 36, flex: 1}}
                layout={animation ? LinearTransition.springify() : undefined}
            >
                <Animated.FlatList
                    data={data}
                    itemLayoutAnimation={animation ? LinearTransition.springify() : undefined}
                    renderItem={({item}) => (
                        <Animated.View 
                            layout={animation ? LinearTransition.springify() : undefined}
                            entering={animation ? FadeInDown.springify() : undefined}
                            exiting={animation ? FadeOut.springify() : undefined}
                        >
                            <Animated.View>
                                <TouchableOpacity 
                                    style={styles.item} 
                                    onPress={() => deleteItem(item.id)}
                                >
                                    <Text>item</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </Animated.View>
                    )}
                />
            </Animated.View>

        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {  
        flex: 1,  
        paddingVertical: 36,
        paddingHorizontal: 32
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginTop: 24
    },
    title: {
        fontWeight: '600',
        fontSize: 48
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1,
        padding: 12,
        backgroundColor: 'lightgray',
        borderColor: 'gray'
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1,
        padding: 12,
        width: 200,
        marginVertical: 8,
        backgroundColor: 'lightgray',
        borderColor: 'gray'
    },
    itemContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#f2f2f2',
        transitionProperty: ['maxHeight'], 
        transitionDuration: 200,
        marginTop: 36
    },
})