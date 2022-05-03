from requests_oauthlib import OAuth1Session, OAuth2Session
import requests
from config import *


def generate_authenticate_url():
    """
        認証用URLを生成する。
    """
    session_req = OAuth1Session(TWITTER_API_KEY, TWITTER_API_KEY_SECRET)
    response_req = session_req.post(REQUEST_ENDPOINT_URL, params={"oauth_callback": CALLBACK_URL})
    response_req_text = response_req.text
    oauth_token_kvstr = response_req_text.split("&")
    token_dict = {x.split("=")[0]: x.split("=")[1] for x in oauth_token_kvstr}
    oauth_token = token_dict["oauth_token"]

    return f"{AUTHENTICATE_URL}?oauth_token={oauth_token}"

def generate_authenticate_url_oauth2():
    """
        認証用URLを生成する。
    """
    scope = ["tweet.read", "users.read"]
    oauth = OAuth2Session(TWITTER_CLIENT_ID, redirect_uri=CALLBACK_URL, scope=scope)
    authorization_url, _ = oauth.authorization_url(AUTHENTICATE_URL_OAUTH2)
    return authorization_url

def verify_oauth_token(oauth_token, oauth_verifier):
    """
        アカウントを認証する。
        認証に成功したとき、アカウントのユーザーIDを返す。
    """
    session_acc = OAuth1Session(TWITTER_API_KEY, TWITTER_API_KEY_SECRET, oauth_token, oauth_verifier)
    response_acc = session_acc.post(ACCESS_ENDPOINT_URL, params={"oauth_verifier": oauth_verifier})
    if response_acc.status_code == 200:
        response_acc_text = response_acc.text
        access_token_kvstr = response_acc_text.split("&")
        acc_token_dict = {x.split("=")[0]: x.split("=")[1] for x in access_token_kvstr}
        return acc_token_dict["user_id"]
    else:
        return None

def verify_oauth_token_oauth2(code):
    scope = ["tweet.read"]
    oauth = OAuth2Session(TWITTER_CLIENT_ID, redirect_uri=CALLBACK_URL, scope=scope)
    token = oauth.fetch_token(TOKEN_URL_OAUTH2, code=code, client_secret=TWITTER_CLIENT_SECRET)
    oauth = OAuth2Session(token=token)
    res = oauth.get(USER_URL_OAUTH2)
    if res.status_code == 200:
        res = res.json()
        return res["data"]["id"]
    else:
        return None 

def get_twitter_screen_name(twitter_id):
    headers = {'Authorization': f'Bearer {TWITTER_BEARER_TOKEN}'}
    res = requests.get(f"https://api.twitter.com/2/users/{twitter_id}?user.fields=profile_image_url", headers=headers)
    res = res.json()
    print(res)
    return res["data"]["name"]

def get_twitter_profile_image_url(twitter_id):
    headers = {'Authorization': f'Bearer {TWITTER_BEARER_TOKEN}'}
    res = requests.get(f"https://api.twitter.com/2/users/{twitter_id}?user.fields=profile_image_url", headers=headers)
    res = res.json()
    print(res)
    return res["data"]["profile_image_url"]
