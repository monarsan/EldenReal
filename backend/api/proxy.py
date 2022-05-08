import requests
import json
from fastapi import APIRouter, HTTPException, Depends, status
router = APIRouter()


@router.get("/api/proxy/nearbysearch")
def get_nearbysearch(lat:float, lng:float, radius:int, api_key:str):
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat}%2C{lng}&radius={radius}&key={api_key}&language=ja"
    response = requests.get(url)
    print(response.text)
    if response.status_code != 200:
        raise HTTPException(status_code = response.status_code, detail = "Google API error")
    return response.json()


