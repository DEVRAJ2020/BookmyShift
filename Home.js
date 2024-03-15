import React, { useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";


const Homepage = () => {

    const WIDTH = Dimensions.get('window').width;
    const HEIGHT = Dimensions.get('window').height;
    const [List, set_List] = useState([{}, {}])
    const [selected, set_Selected] = useState("");
    const [loader, set_loader] = useState("")
    const [booked_shift, setbooked_shift] = useState([])

    const DATA = [
        {
            id: 'c1b1-46c2-aed5-3ad53abb28ba',
            title: 'india',
            totalshift: ['7'],
            shiftlistbydate: [
                {date: 'today', shifts: [{ time: '12:05-13:05', ID: '545787531' }, { time: '13:05-14:15', ID: '5487316567' }]
                },
                { date: 'march 16', shifts: [{ time: '20:20-8:30', ID: '65657794215' }, { time: '3:0-4:0', ID: '3345487' }, { time: '4:0-5:0', ID: '65677842' }] },
                { date: 'march 17', shifts: [{ time: '5:0-6:0', ID: '36362' }, { time: '6:0-7:0', ID: '353536' }] }]
        }
        ,
        {
            id: 'bd7acbea-c1b1-46c2-3ad53abb28ba',
            title: 'usa',
            totalshift: ['6'],
            shiftlistbydate: [
                {date: 'today', shifts: [{ time: '7:0-8:0', ID: '5958' }, { time: '8:0-9:0', ID: '565847' }]
                },
                { date: 'march 18', shifts: [{ time: '9:0-1:00', ID: '25258' }, { time: '1:00-:2:11', ID: '56478' }] },
                { date: 'march 19', shifts: [{ time: '1:01-:012', ID: '6847511' }, { time: '1:02-:2:01', ID: '321478' }] }]
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3a',
            title: 'california ',
            totalshift: ['4'],
            shiftlistbydate: [
                {date: 'today', shifts: [{ time: '13:00-14:00', ID: '663321' },]
                },
                { date: 'march 20', shifts: [{ time: '14:00-15:00', ID: '55555' }] },
                { date: 'march 21', shifts: [{ time: '15:00-16:00', ID: '333.2' }, { time: '16:00-17:00', ID: '777755' }] }]
        }
    ]

    const Book = (item) => {
        set_loader(item.item.ID)
        if (booked_shift.includes(item.item.ID)) {
            booked_shift.splice(booked_shift.indexOf(item.item.ID))
        } else {
            setTimeout(() => {
                booked_shift.push(item.item.ID)
            }, 800);
        }
        setTimeout(() => {
            set_loader("")
        }, 800);
    }
    const HeaderView = (item) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    set_List(item.item.shiftlistbydate),
                        set_Selected(item.index)
                }}
                style={{ height: 50, minWidth: WIDTH * 0.28, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginHorizontal: WIDTH * 0.015, }}>
                <Text style={{ color: selected == item.index ? 'blue' : '#4F6C92', fontSize: 22, fontWeight: '600', textAlign: 'left', }}>
                    {item.item.title} {`(${item.item.totalshift})`}
                </Text>
            </TouchableOpacity>
        )
    }
    const SigngleDateView = (item) => {
        return (
            <View
                style={{ backgroundColor: '#F1F1F1', height: 50, width: WIDTH, marginVertical: 2, alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 0, flexDirection: 'row' }}>
                <View
                    style={{ height: 40, minWidth: WIDTH * 0.2, marginVertical: 1, borderRadius: 25, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginHorizontal: 0 }}>
                    <Text style={{ fontSize: 20, textAlign: 'left', }}>
                        {item.item.time}
                    </Text>
                </View>
                <View
                    style={{ height: 40, width: WIDTH * 0.25, marginVertical: 1, borderRadius: 25, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginHorizontal: 0, }}>
                    {booked_shift.includes(item.item.ID) ?
                        <Text style={{ fontSize: 15, textAlign: 'left', color: booked_shift.includes(item.item.ID) ? "#16A64D" : "#4F6C92" }}>
                            Booked
                        </Text> :
                        <Text style={{ fontSize: 15, textAlign: 'left', }}>
                            Book
                        </Text>
                    }
                </View>
                <TouchableOpacity
                    onPress={() => {
                        Book(item)
                    }}
                    style={{ height: 40, width: WIDTH * 0.25, marginVertical: 1, borderRadius: 25, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#A4B8D3', marginHorizontal: 5 }}>
                    {item.item.ID != loader ?
                        <>
                            {booked_shift.includes(item.item.ID) ?
                                <Text style={{ fontSize: 15, textAlign: 'left', color: booked_shift.includes(item.item.ID) ? "#E2006A" : "#4F6C92", fontWeight: '600' }}>
                                    cancel
                                </Text> :
                                <Text style={{ fontSize: 15, textAlign: 'left', color: '#16A64D' }}>
                                    Book
                                </Text>}
                        </>
                        :
                        <ActivityIndicator />
                    }
                </TouchableOpacity>
            </View>
        )
    }
    const ShiftView = (item) => {
        return (
            <View
                                style={{ minHeight: 100, maxHeight: 800, width: WIDTH, alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'column', }}>
                <View style={{ minHeight: 50, minWidth: 100, justifyContent: 'center', padding: 5, backgroundColor: '#CBD2E1' }} >
                    <Text style={{ fontSize: 25, textAlign: 'left', marginLeft: 20 }}>
                        {item.item.date}
                    </Text>
                </View>
                <FlatList
                    data={item.item.shifts}
                    renderItem={SigngleDateView}
                    keyExtractor={item => item.id}
                />

            </View>
        )
    }

    return (
        <>
            <View style={{ height: HEIGHT, width: WIDTH, }}>
                <View style={{ height: 80, width: WIDTH, borderColor: '#CBD2E1', borderTopWidth: 2, borderBottomWidth: 2, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <FlatList
                        horizontal={true}
                        data={DATA}
                        renderItem={HeaderView}
                        keyExtractor={item => item.id}
                    />
                </View>
                <FlatList
                    style={{ marginTop: 2 }}
                    data={List}
                    renderItem={ShiftView}
                    keyExtractor={item => item.id}
                />
            </View>
        </>
    )
}

export default Homepage