import { AngularFirestore,
        AngularFirestoreCollection,
        AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Post } from '../model/post';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsCollection: AngularFirestoreCollection<Post>
  postDoc: AngularFirestoreDocument<Post>

  constructor(private db: AngularFirestore) {
    this.postsCollection = this.db.collection('posts', ref =>
      ref.orderBy('published', 'desc')
    )
  }

  getPosts(){
    return this.postsCollection.snapshotChanges().map(actions =>{
      return actions.map(a => {
        const data = a.payload.doc.data() as Post
        const id = a.payload.doc.id
        return { id, ...data }
      })
    })
  }

  getPostData(id: string) {
    this.postDoc = this.db.doc<Post>(`posts/${id}`)
    return this.postDoc.valueChanges()
  }

  getPost(id: string) {
    return this.db.doc<Post>(`posts/${id}`)
  }

  create(data: Post) {
    this.postsCollection.add(data)
  }

  delete(id: string) {
    return this.getPost(id).delete()
  }

  update(id: string, formData) {
    return this.getPost(id).update(formData)
  }


}
