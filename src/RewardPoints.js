import React, { Component } from 'react';

import './App.css';

const MONTHS = [ "January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December" ];

class RewardPoints extends Component {

  constructor() {
    super();

    this.state = {
      transactionData: [{custName: 'Shridhar1', date: '08/09/2018', trasactionAmt: '152'},
      {custName: 'Shridhar1', date: '08/09/2018', trasactionAmt: '120'},
      {custName: 'Shridhar1', date: '07/09/2018', trasactionAmt: '25'},
      {custName: 'Shridhar1', date: '07/09/2018', trasactionAmt: '77'},
      {custName: 'Shridhar2', date: '08/09/2018', trasactionAmt: '52'},
      {custName: 'Shridhar2', date: '07/09/2018', trasactionAmt: '222'},
      {custName: 'Shridhar3', date: '06/09/2018', trasactionAmt: '255'},
      {custName: 'Shridhar3', date: '07/09/2018', trasactionAmt: '81'}]
    }
  }

  calcRewardPoints(amt) {    
    if(parseFloat(amt) > 100 ) {
      return (amt - 100)*2 + 50;
    } else if(parseFloat(amt) <= 100 || parseFloat(amt) > 50 ) {
      return 50;
    }
    return 0;
  }

  getMonthName(date) {
    let d = new Date(date);
    return MONTHS[d.getMonth()];
  }

  groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  render() {
    let pointsTotal = {};
    let tableData = this.state.transactionData.map((dataList, index) => {
      if(!pointsTotal[dataList.custName]) {
        pointsTotal[dataList.custName] = [];
        pointsTotal[dataList.custName][this.getMonthName(dataList.date)] =  this.calcRewardPoints(parseFloat(dataList.trasactionAmt));
        pointsTotal[dataList.custName][this.getMonthName(dataList.date)] =  this.calcRewardPoints(parseFloat(dataList.trasactionAmt));        
      } else {
        if(!pointsTotal[dataList.custName][this.getMonthName(dataList.date)]) {
          pointsTotal[dataList.custName][this.getMonthName(dataList.date)] =  this.calcRewardPoints(parseFloat(dataList.trasactionAmt));
        } else {
          pointsTotal[dataList.custName][this.getMonthName(dataList.date)] +=  this.calcRewardPoints(parseFloat(dataList.trasactionAmt));
        }
      }
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{dataList.custName}</td>
          <td>{this.getMonthName(dataList.date)}</td>
          <td>{dataList.trasactionAmt}</td>
          <td>{this.calcRewardPoints(parseFloat(dataList.trasactionAmt))}</td>
          <td>{pointsTotal[dataList.custName][this.getMonthName(dataList.date)]}</td>
        </tr>
      )
    });

    return (
      <div className="App">
        <header><h1 className="App-title">Rewards Point Table</h1></header>
        <section>
          <table cellSpacing="50">
            <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Month</th>
              <th>Transaction Amount</th>
              <th>Reward Points</th>
              <th>Total Points</th>
            </tr>
            </thead>
            <tbody>
              {tableData}            
            </tbody>
          </table>          
        </section>
      </div>
    );
  }
}

export default RewardPoints;
