const Mutation = {
    insertPeople(parent, { data }, { db }, info) {
        try {
            let collections = db.people;

            data.forEach(element => {
                const idx = collections.findIndex(
                    person => person.ssn === element.ssn
                );

                if (idx === -1)
                    collections.push(element);
                else
                    collections.splice(idx, 1, element)
            });

            let str = JSON.stringify(collections);
            collections = JSON.parse(str);

            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
}

export { Mutation as default };