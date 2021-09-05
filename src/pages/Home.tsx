import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import {Button} from '../components/Button';
import {SkillCard} from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [gretting, setGretting] = useState('');

  function handleAddNewSkill() {
    const data: SkillData = {
      id: String(new Date().getTime()),
      name: newSkill,
    };

    setMySkills(oldState => [...oldState, data]);
  }

  useEffect(() => {
    const currenteHour = new Date().getHours();

    if (currenteHour < 12) {
      setGretting('Good morning');
    } else if (currenteHour >= 12 && currenteHour < 18) {
      setGretting('Good afternoon');
    } else {
      setGretting('Good night');
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Welcome, Maicon </Text>
      <Text style={styles.gretting}>{gretting}</Text>
      <TextInput
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#999"
        onChangeText={setNewSkill}
      />
      <Button onPress={handleAddNewSkill} title="Add" />
      <Text style={[styles.title, {marginVertical: 50}]}>My Skills</Text>
      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({item}) => <SkillCard skill={item.name} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  gretting: {
    color: '#fff',
  },
});
