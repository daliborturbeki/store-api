import json
from bitcoinrpc.authproxy import AuthServiceProxy, JSONRPCException

rpc_user,rpc_password = "user","password"

value = input()
data = json.loads(value)
amount = data['amount']
sender = data['sender']
reciever = data['reciever']

def odradi_trans(txid,vout,address,amount):    
    #pass  #pass zamijeniti sa željenim programskim kodom (poslužite se primjerom na 19. slajdu iz 5. predavanja)
            
    craw=rpc_conn.createrawtransaction([{'txid': txid, 'vout': vout}], [{address: amount}])
    fraw=rpc_conn.fundrawtransaction(craw)
    sraw=rpc_conn.signrawtransactionwithwallet(fraw['hex'])
    txid=rpc_conn.sendrawtransaction(sraw['hex'])
    return txid

print('New transaction')


rpc_conn = AuthServiceProxy("http://%s:%s@127.0.0.1:18370/wallet/Dalibor"%(rpc_user,rpc_password))

# newAddress = rpc_conn.getnewaddress()
# print('New Address: ', newAddress)

popis = rpc_conn.listunspent()
for i in popis:
    if i['amount'] > 0.01:
        txid=i['txid']
        vout=i['vout']
        break

print('TXID transakcije: ', odradi_trans(txid, vout, reciever, amount))

print(f'{sender} sent {amount}SYS to {reciever}.')