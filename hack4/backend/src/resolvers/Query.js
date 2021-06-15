const Query = {
    statsCount(parent, { severity, locationKeywords }, { db }, info) {
        try {
            const collections = db.people;
            // console.log(severity)
            console.log(collections)

            const countArr = [];
            locationKeywords.forEach(locationKeyword => {
                let num = 0;
                collections.forEach(person => {
                    console.log(person.severity);
                    if (person.location.description.includes(locationKeyword)) {
                        if (!severity)
                            num += 1;
                        else if (person.severity >= severity)
                            num += 1;
                    }
                })
                countArr.push(num);
            });

            return countArr;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

export { Query as default };