import { AngularFirestore,
        AngularFirestoreCollection,
        AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Post } from '../model/post';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsCollection: AngularFirestoreCollection<Post>
  postDoc: AngularFirestoreDocument<Post>

  constructor(private db: AngularFirestore,private http:HttpClient) {
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
    // this.postsCollection.add(data);
    console.log(data);
    
    this.http.post<Post>(environment.ENPOINT+'/post',data).pipe().subscribe((status)=>{
      console.log(status);
      
    });
  }

  delete(id: string) {
  this.http.post(environment.ENPOINT+"/delete",{
    "id":id
  }).pipe().subscribe((status)=>{
    console.log(status);
  });
  
    // return this.getPost(id).delete()
  }

  update(id: string, formData) {
    this.http.post(environment.ENPOINT+'/update',{
      "id":id,
      "formData":formData
    }).pipe().subscribe((status)=>{
      console.log(status);
    })
    // return this.getPost(id).update(formData)
  }


}
