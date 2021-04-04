import React, { useState, useEffect } from 'react';
import Poster from '../Component/posters';

import './movieList.css';

const MovieList = () => {
    const [myList, setMyList] = useState([]);
    const [recommendation, setRecommendation] = useState([]);

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {

        let myListData = [];
        let myRecommendData = [];

        const response = await fetch('data.json')
        const responseData  = await response.json()


        for(const item in responseData.mylist){
            myListData.push({
                title: responseData.mylist[item].title,
                id: responseData.mylist[item].id,
                imgUrl: responseData.mylist[item].img,
                buttonType: "remove"
            })
        }

        for(const item in responseData.recommendations){
            myRecommendData.push({
                title: responseData.recommendations[item].title,
                id: responseData.recommendations[item].id,
                imgUrl: responseData.recommendations[item].img,
                buttonType: "add"
            })
        }

        setMyList(myListData)
        setRecommendation(myRecommendData)
    }

    const changeListHandler = (type, object) => {
        if(type === 'add'){
            setMyList(prevMyList => [
                ...prevMyList,
                {
                    title: object.title,
                    id: object.id,
                    imgUrl: object.imgUrl,
                    buttonType: "remove"
                }
            ])
            setRecommendation(prevRecommendation => 
                prevRecommendation.filter(item => item.id !== object.id)
            )
        }
        if(type === 'remove'){
            setRecommendation(prevRecommendation => [
                ...prevRecommendation,
                {
                    title: object.title,
                    id: object.id,
                    imgUrl: object.imgUrl,
                    buttonType: "add"
                }
            ])
            setMyList(prevMyList => 
                prevMyList.filter(item => item.id !== object.id)
            )
        }
}

    const PosterList = myList.map(item => (
            <Poster
                key={item.id}
                id={item.id} 
                imgUrl={item.imgUrl}
                title={item.title}
                buttonType={item.buttonType}
                onChangeList={changeListHandler}/> 
        )
    )

    const PosterRecommand = recommendation.map(item => (
        <Poster 
            key={item.id}
            id={item.id}
            imgUrl={item.imgUrl}
            title={item.title}
            buttonType={item.buttonType}
            onChangeList={changeListHandler}/> 
    )
)



    return (
        <div>
            <div className="summary-container">
                <h2>My List</h2>
                <div className="list-Container">
                    {PosterList} 
                </div>
            </div>
            <div className="summary-container">
                <h2>Recommendation</h2>
                <div className="list-Container">
                    {PosterRecommand} 
                </div>
            </div>
            
        </div>
    )
}

export default MovieList;