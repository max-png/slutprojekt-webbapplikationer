export default ({
    state: {
        myOrders: [{
            _id: 123,
            timeStamp: Date.now(),
            status: 'inProcess',
            items: ['KteswkqVlvLNJdUP', 'VQCZcEEEC6U7HrHf'],
            orderValue: 999
        },
        {
            _id: 456,
            timeStamp: Date.now(),
            status: 'inProcess',
            items: ['kMAscCs2xnmtPSqg', 'VQCZcEEEC6U7HrHf', 'KteswkqVlvLNJdUP'],
            orderValue: 2000

        }
        ],

        orderItems: [
            {
                "title": "Swag",
                "price": 799,
                "shortDesc": "Unisex",
                "category": "board",
                "longDesc": "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
                "imgFile": "skateboard-generic.png",
                "serial": "172381278381237",
                "_id": "KteswkqVlvLNJdUP"
            },
            {
                "title": "Awesome",
                "price": 799,
                "shortDesc": "Unisex",
                "category": "board",
                "longDesc": "Axle crailtap fastplant dude regular footed helipop impossible. Wax Jimmy'Z half-flip transfer nollie launch ramp mongo egg plant. Pogo slap maxwell g-turn boneless risers blunt nose slide.",
                "imgFile": "skateboard-generic.png",
                "serial": "2384993841228443",
                "_id": "VQCZcEEEC6U7HrHf"
            },
            {
                "title": "Tricky",
                "price": 799,
                "shortDesc": "Unisex",
                "category": "board",
                "longDesc": "Skate ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
                "imgFile": "skateboard-generic.png",
                "serial": "231874871397182",
                "_id": "kMAscCs2xnmtPSqg"
            },
        ]


    },
    mutations: {

    },
    getters: {

    },
    actions: {
        // async getProductById(context, productId) {
        //     context.state.products
        //     const fetchedProduct = await API.fetchProductById(productId);
        //     return fetchedProduct
        // },
    },

    modules: {},
});
