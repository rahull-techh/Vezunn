from channels.consumer import SyncConsumer,AsyncConsumer

class MySync(SyncConsumer):

    def websocket_connect(self,event):
        pass

    def websocket_receive(self,event):
        pass

    def websocket_disconnect(self,event):
        pass

class MyAsync(AsyncConsumer):

    async def websocket_connect(self,event):
        pass

    async def websocket_receive(self,event):
        pass

    async def websocket_disconnect(self,event):
        pass