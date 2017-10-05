import callFloodlight from 'tools/callFloodlight';

document.querySelector('#panel2SubmitButton').addEventListener('click', () => {
    callFloodlight.click('4035228', 'fy18s0', 'findp00');
});

document.querySelector('#panel2ProdlistButton').addEventListener('click', () => {
    callFloodlight.click('4035228', 'fy18s0', 'findp000');
});
