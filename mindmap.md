Tables 
    User (Admin/ user/ driver)
        name, email, phoneumber, roleId

    Role 
        roleName,

    Category 
        categoryName,

    Product 
        productName, price, categoryId,

    Orders 
        OrderId,UserId,Datetime,status,total price
    
    order-product
        orderId,productId

    Cart
        productId,quantity,userId 

    Address  --> userId 
        optional(pin,Address)

Screens 
    Profile Screen /profile
        name
        email
        address
            edit/add address
        Link MyOrders
        Link Cart
    resetPassword /resetpassword
        email
        submit

        newpassword
        cnfnewpassword
        submit

    Signup /signup (multistep form)
        name 
        email 
        phonenumber 
        password
        cnfpassword

    Login /login
        email 
        password 
        forgotpassword

    Categories + Add category
        Categories list: /categories
            Category name, option to open list of products
        Category add (Form) /addcategory
            categoryName,image(optional)

    Products + Add product + Disable product 
        Product list: /products
            name, category, price , available/notavailale

        Product add: /addproduct
            name, 
            dropdown of categories (Select box)
            price 
 
        Product dsiable /disaleproduct
            searchble input box
                list of cards of products

    Myorders/placedorders /myorders
        order
        status

    cart /cart
        product
        quantity

    Add driver 
        driverName,phoneNumber,email,address

    Apply for driver role 

    List of orders --> Static screen with static filters 


APIs
    node <xxxx.js> 
    Login API POST
    signup API POST
    Add categories POST
    List categories POST
    Add product POST
    list product GET /categoryId
    disable product POST
    Update product (name, price) PUT
    Add product to cart
    Place Order
    updateOrder
