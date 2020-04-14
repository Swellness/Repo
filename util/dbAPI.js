import React from 'react'
import { Stitch, RemoteMongoClient, UserPasswordCredential, UserPasswordAuthProviderClient } from 'mongodb-stitch-react-native-sdk';


//DOUCUMENTATION FOR MANIPULATING COLLECTIONS FOUND HERE
//https://docs.mongodb.com/stitch-sdks/js-react-native/4/interfaces/remotemongocollection.html
//WHEN YOU LOAD A COLLECTION, THE DB IS AUTOMATICALLY INCLUDED SO LONG AS YOU CORRECTLY NAME IT IN THE METHOD

export const loadClient = () => { //ALWAYS NEEDED
    Stitch.initializeDefaultAppClient('swellness-test-rkmwl')
        .then(() => {
            console.log("client built")
        }).catch(err => {
            console.log("load failed:", err)
        })
}

export const hasDefaultClient = () => { //checks if client exists
    if (Stitch.defaultAppClient === 'undefined') {
        console.log("default client undefined")
        return false
    }
    else {
        console.log("default client defined")
        return true
    }
}

export const loadDb = (database) => { //returns RemoteMongoDatabase, almost never used
    const db = Stitch.defaultAppClients.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db(database)
    return db;
}

export const loadCollection = (database, collection) => { //returns RemoteMongoCollection, use this one
    const ctn = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db(database).collection(collection)
    return ctn;
}

//////////DEPRECATED/////////// check login.js for working version
// export const login = (username, password) => {//logs in and returns user object
//     console.log("attempting login using  " + username + " and " + password)
//     Stitch.defaultAppClient.auth.loginWithCredential(new UserPasswordCredential(username, password)).then().catch(err => {console.log(`Failed to log in ${err}`)})
// }

export const addData = (database, collection, input) => {
    Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db(database).collection(collection).insertOne(input)
        .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`)) //db.collection selects a collection and insertOne inserts the document and logs if successful or failure
        .catch(err => console.error(`Failed to insert item: ${err}`))
}
//equivalent of taking a Stich collection object and applying the insertOne method


export const updateData = (database, collection, objId, object) => { //database and collection are the NAME and not a DB or collection object
    Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db(database).collection(collection).updateOne({ objId }, { $set: object })
    .then(result => console.log(`${result}`)) //db.collection selects a collection and insertOne inserts the document and logs if successful or failure
    .catch(err => console.error(`Failed to update item: ${err}`))
}
//equivalent of taking a Stitch collection object and applying the upddateOne method
//example object: const output = { "hours": data1, "points": data2 }

export const login = (username, password) => { //logs in and returns user object
    console.log("attempting login using  " + username + " and " + password)
    Stitch.defaultAppClient.auth.loginWithCredential(new UserPasswordCredential(username, password)) //takes username and password combo and attempts email/pw auth through stitch
        .then(user => {
            console.log(`Successfully logged in as user ${user.profile.email}`);
        }).catch(err => {
            console.log(`Failed to log in ${err}`);
        });
}

export const logout = () => {
    Stitch.defaultAppClient.auth.logout().then(user => { //takes the client and runs auth.logout() to log the client out
        console.log(`Successfully logged out`);

    }).catch(err => {
        console.log(`Failed to log out: ${err}`);
    });
}
