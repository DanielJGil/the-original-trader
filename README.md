# The Original Trader
LIVE DEMO URL: the-original-trader.vercel.app

If you wish to view a live demo, please login using these credentials:

Guest Login Credentials: 
Email: wonof45717@jucatyo.com
Password: guestguest

This is an application meant for traders to help them track their progress and learn from their mistakes.
It is meant to be used as a journal where you can add the trades you have taken and then see the overall statistics and your account growth over time.
As a trader myself, I wanted to have an application that can help me grow as a trader and help me improve my performance so I decided to build one for myself
and for anyone else looking to track their progress.

Application features:
1. Dashboard - Here the user can view their statistics and account growth. Here are some of the current features available on the Dashboard:
   - Statistics that show your profit in percentage, current account balance, total number of trades taken and also your win rate.
   - A table which displays a summary of the trades you have taken today.
   - A pie chart which displays your wins, losses and trades that ended up being break even (no profit or loss).
   - A graph chart which displays your account growth overtime.
  <img width="1470" alt="Screenshot 2023-11-14 at 14 20 21" src="https://github.com/DanielJGil/the-original-trader/assets/131858991/9407a155-b79c-4da1-94c1-839be5925281">

     
2. Trades - Here the user can view all the trades they have taken in a data table. Here are some of the current features available on the Trades page:
   - View a table which displays all the trades you have taken. You are able to sort the trades according to each category in the table.
   - Click on any trade and either view the trade (which will open up the selected trade and will display more detailed information, including an image of the trade) or delete the trade.
   - Add a new trade. This will display a form where the user can input all the relevant information regarding the trade and even add an image.
3. Settings - Here the user can change the size of their account, which will automatically alter all the statistics according to the new size.
4. Account - Here the user can edit their name, add a profile picture and change their password.
5. Authentication - When the user first opens up the application, the user can either login to an exisiting account or create a new one. The application cannot be accessed unless the user is logged in.
6. Dark Mode - There is an option to change the application to Dark Mode. It will automatically open up as Dark Mode if the user's system is already set to Dark Mode.

I built this application using React. I used the Material UI Library for certain components such as Buttons, Tables and the Nav Menu.
I used Supabase to create my database.

My technology choices:
Routing - React Router
Styling - Tailwind and Material UI
Remote State Management - React Query
UI State Management - Context API
Form Management - React Hook Form
I also used other libraries such as React Icons, React Hot Toast, Recharts and DayJS.

Here are some more screenshots of the application: 

