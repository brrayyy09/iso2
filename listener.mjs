import events from "events";

const eventListener = new events.EventEmitter();
const notificationChanel = "notification-chanel";

export const sendNotification = message => {
    eventListener.emit(notificationChanel, message);
};

export const startNotificationListener = () => {
    eventListener.on(notificationChanel, (message) => {
        console.log(message);
    })
}