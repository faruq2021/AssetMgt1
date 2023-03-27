**Asset Management Project**
![image](https://user-images.githubusercontent.com/78708123/227997456-2b4dce31-c43c-4080-82ad-81d16459156a.png)


This project aims to provide transparent and public auditing of public servants' financial assets. It uses Hardhat for smart contract development, React for frontend development, and Wagmi to interact with the smart contract.

**Features**

Public servants can add their personal details, such as their name, address, and the value of their assets as the initialValue.
Users can retrieve a public servant's personal details, including the initial value of their assets, their current balance, and the date they were added to the system.
Users can track the changes in a public servant's asset value in real-time.
.
**How to use**
Clone this repository:https://github.com/faruq2021/AssetMgt1.git

git clone https://github.com/faruq2021/AssetMgt1.git

**Install dependencies:**

cd AssetMgt

npm install

Start the frontend:

npm start

Visit http://localhost:3000 in your browser to use the application.
You can as well check the Live app deployed on vercel 
https://asset-mgt1.vercel.app/

**How it works**
Smart contract
Verified at : https://goerli.etherscan.io/address/0xcE8352D024829b9A70B57dE7617364f1074f4067#code

The smart contract is located in the contracts directory. It has the following functions:

addUser(): allows a public servant to add their personal details and the value of their assets to the system.
getUser(): allows a user to retrieve a public servant's personal details, including their name, address, and the date they were added to the system.
getCurrentValue(): allows a user to retrieve a public servant's current asset value, including the initial value of their assets, their current balance, and their current asset value.

Frontend
The frontend is located in the src directory. It uses React for rendering and interacting with the smart contract. It has the following pages:

Home: displays the list of public servants and their current asset values.
AddUser: allows a public servant to add their personal details and the value of their assets to the system.
ViewUser.js: Allows anyone to view a public servants value on the platform with that public servanst public address.
CurrentValue.js: displays a public servant's Initial value, wallet balance, current value.
Header.js: Displays the connected address and ask you to connect wallet if none has been connected.
Hero.js: Displays information about the app and link to get started with account creation and auditing asset.

Conclusion
This asset management project provides a secure and decentralized application that enables public servants
to declare their assets and for the public to track them in real-time. By providing transparency and accountability, 
this project promotes ethical governance, where public servants' assets are held accountable to the public.



