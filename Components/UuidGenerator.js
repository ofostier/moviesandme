import UUIDGenerator from 'react-native-uuid-generator';

// Callback interface
export function _uuidGenerator (uuid) {
    UUIDGenerator.getRandomUUID().then((uuid) => {
        console.log("UUID", uuid);
    });
}

