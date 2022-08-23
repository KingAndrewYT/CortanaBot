const secciones = [
    {
    title: "Seccion 1 opcional",
    rows: [
        {title: "Opcion 1", rowId: "opcion1"},
        {title: "Opcion 2", rowId: "opcion2", description: "Esta es una descipcion opcional"}
    ]
    },
   {
    title: "Seccion 2 opcional",
    rows: [
        {title: "Opcion 3", rowId: "opcion3"},
        {title: "Opcion 4", rowId: "opcion4", description: "Esta es una descripcion opcional"}
    ]
    },
]

const lista = {
  text: "This is a list",
  footer: "nice footer, link: https://google.com",
  title: "Amazing boldfaced list title",
  buttonText: "Required, text on the button to view the list",
  sections
}

const sendMsg = await sock.sendMessage(id, listMessage)