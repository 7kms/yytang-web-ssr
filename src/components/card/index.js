import Card from './card';
let cardInstance;

function getInstance () {
    if (!cardInstance) {
        const options = {
            onRemove: function () {
                cardInstance = null;
            }
        };
        cardInstance = Card.newInstance(options);
    }
    return cardInstance;
}

export default {
    show (user, position) {
        getInstance().show(user, position);
    },
    hide () {
        if (cardInstance) {
            cardInstance.hide();
        }
    },
    remove () {
        if (cardInstance) {
            cardInstance.remove();
        }
    }
};
