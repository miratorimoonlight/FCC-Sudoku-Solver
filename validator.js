/************* Code here... **************/


module.exports = {
  checkCheck: (req, res, next) => {
    const {coordinate, value} = req.body;

    if (!coordinate || !value) 
      return res.send({ error: 'Required field(s) missing' });

    //check coordinate
    if (coordinate.length != 2) 
      return res.send({ error: 'Invalid coordinate' });

    //assign the splitted coord to 2 diff variables
    let [row, col] = coordinate.split('');
    
    switch(row.toLowerCase()){
      case 'a': req.body.row = 0; break;
      case 'b': req.body.row = 1; break;
      case 'c': req.body.row = 2; break;
      case 'd': req.body.row = 3; break;
      case 'e': req.body.row = 4; break;
      case 'f': req.body.row = 5; break;
      case 'g': req.body.row = 6; break;
      case 'h': req.body.row = 7; break;
      case 'i': req.body.row = 8; break;
      default: return res.send({ error: 'Invalid coordinate' });
    }

    if (!/^[1-9]$/.test(col))
      return res.send({ error: 'Invalid coordinate' });
    
    //if no error to col, add it to the req.body (+ cast it to number)
    req.body.col = +col - 1;

    if (!/^[1-9]$/.test(value))
      return res.send({ error: 'Invalid value' });

    next();
  },

  checkPuzzle: (req, res, next) => {
    const {puzzle} = req.body;
  
    if(!puzzle) 
      return res.send({ error: 'Required field missing' });

    if(puzzle.length != 81) 
      return res.send({ error: 'Expected puzzle to be 81 characters long' });

    if(/[^0-9.]/g.test(puzzle))
      return res.send({ error: 'Invalid characters in puzzle' });

    next();
  }
  
}