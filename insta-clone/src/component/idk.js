
// Retrieve the current data of the document.
documentRef.get()
  .then((doc) => {
    if (doc.exists) {

      const currentData = doc.data();

      // Retrieve the current array of names (assuming 'names' is the array field in your document).
      let currentPosts = currentData.post || []; // If 'names' field doesn't exist, initialize it as an empty array.

      // Push the new name to the array.
      currentPosts.push(documentId);

      // Use the `update()` method to update the 'names' field in the document with the new array.
      documentRef.update({ post: currentPosts });
      
    } else {
      console.log("Document not found!");
      return null;
    }
  })
  .then(()=>{
    for(let i = 0; i < hashtagArray.length; i++){
      const searchString = hashtagArray[i]; // Replace this with the actual document ID you want to search.

// Create a reference to the specific document using the document ID.
const documentRef2 = db.collection("hashtag").doc(searchString);

// Get the document with the specified ID.
// documentRef2
//   .get()
//   .then((doc) => {
//     if (doc.exists) {
//       // Document found, extract the data and document ID.
//       const documentData2 = doc.data();
//       let currentData = documentData2.list || [];
    
//       currentData.push(documentId)
//       documentRef2.update({ list: currentData });
//     } else {
//       // Document with the provided ID not found.
//       console.log("Document with the provided ID not found.");
     
//     }
//   })
db.runTransaction((transaction) => {
  // Try to get the document with the specified ID.
  return transaction.get(documentRef2).then((doc) => {
    if (doc.exists) {
      const documentData2 = doc.data();
      let currentData = documentData2.list || [];
    
      currentData.push(documentId)
      documentRef2.update({ list: currentData });
    } else {
     
      const dataToCreate = {
        list: [documentId],
        // Add other fields if needed.
      };
      transaction.set(documentRef, dataToCreate);
      console.log(dataToCreate);
      return dataToCreate;
      
    }
  });
})
  .catch((error) => {
    console.error("Error fetching document:", error);
  });

    }
  })
  .then(() => {
    console.log("Document successfully updated!");
  })
  .catch((error) => {
    console.error("Error updating document:", error);

  });