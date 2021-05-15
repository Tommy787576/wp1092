import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
    const { name, subject, score } = req.body;
    const card = new ScoreCard({ name, subject, score });

    const existing = await ScoreCard.findOne({ name, subject });
    if (existing) {
      await ScoreCard.findOneAndUpdate(
        { name, subject },
        { $set: { score } },
        (err, _) => {
          if (err)
            console.log(err);
          else {
            console.log("Update Successfully");
            res.status(200).send({ message: `Updating (${name}, ${subject}, ${score})`, card });
          }
        })
    }
    else {
      try {
        await card.save();
        console.log("Add Successfully");
        res.status(200).send({ message: `Adding (${name}, ${subject}, ${score})`, card });
      }
      catch (e) {
        throw new Error("Card creation error: " + e);
      };
    }
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// delete the collection of the DB
router.delete('/delete-collection', async function (req, res) {
  try {
    await ScoreCard.deleteMany({});
    console.log("Database cleared");
    res.status(200).send({ message: "Database cleared" });
  }
  catch (e) {
    throw new Error("Database deletion failed");
  }
})

// implement the DB query
// route.xx(xxxx)
router.get('/query-string', async function (req, res) {
  const { queryType, queryString } = req.query;
  const findObject = (queryType === "name") ? { name: queryString } : { subject: queryString };
  console.log(findObject);
  console.log(queryType);

  const existing = await ScoreCard.findOne(findObject);
  if (existing) {
    await ScoreCard.find(findObject, (err, docs) => {
      if (err)
        console.log(err);
      else {
        let returnCards = [];

        docs.forEach(doc => {
          returnCards.push(`{name: ${doc.name}, subject: ${doc.subject}, score: ${doc.score}}`);
        })

        res.status(200).send({
          messages: returnCards,
        });
      }
    })
  }
  else {
    res.status(200).send({
      message: `${queryType} (${queryString}) not found!`
    });
  }
})

export default router;
