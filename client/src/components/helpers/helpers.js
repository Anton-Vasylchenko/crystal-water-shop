const helpers = {
    createEmailTemplate: function (obj) {
        let order = `<table style="border: 1px solid black">    
        <tr style="border: 1px solid black">
          <th>Назва</th>
          <th>Кількість</th>
          <th>Ціна</th>
        </tr>`
        for (let key in obj) {
            order += `<tr><td style="border: 1px solid black">${obj[key][0].name}</td><td style="border: 1px solid black">${obj[key].length} шт.</td><td style="border: 1px solid black">${obj[key][0].price} грн.</td></tr>`
        }
        order += `</table>`;
        return order;
    },

    getIdFormCart: function (items) {
        const id = [];

        for (let key in items) {
            id.push(key);
        }

        return id;
    }
}

export default helpers;