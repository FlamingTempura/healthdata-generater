/* global mhealthgen, d3 */
/* jshint undef: true */
const form = document.forms.options;
const age = date => Math.floor((Date.now() - date.getTime()) / (365 * 24 * 60 * 60 * 1000));
const avg = arr => arr.reduce((avg, el) => avg + el / arr.length, 0);
const charts = [];

form.onsubmit = () => false;

window.update = () => {
	let options = {};
	new Set(Array.from(form).map(e => e.name)).forEach(k => {
		if (k !== '') {
			if (form[k].valueAsDate) {
				options[k] = form[k].valueAsDate;
			} else if (String(Number(form[k].value)) === form[k].value) {
				options[k] = Number(form[k].value);
			} else {
				options[k] = form[k].value;
			}
		}
	});

	document.getElementById('age').textContent = age(options.birthdate) + ' years old';
	document.getElementById('normalHeight').textContent = options.normalHeight + ' cm';
	document.getElementById('normalIntake').textContent = options.normalIntake + ' kcal';
	document.getElementById('normalSatisfaction').textContent = options.normalSatisfaction;
	document.getElementById('normalSleepHours').textContent = options.normalSleepHours + ' hours';
	document.getElementById('normalWeight').textContent = options.normalWeight + ' kg';
	document.getElementById('restingHeartRate').textContent = options.restingHeartRate + ' bpm';
	document.getElementById('bloodType').textContent = options.bloodType;
	document.getElementById('avgBurn').textContent = options.avgBurn + ' kcal';
	return options;
};
window.randomize = () => {
	let person = mhealthgen.generate();
	form.sex.value = person.sex;
	form.birthdate.value = [
		person.birthdate.getFullYear(),
		String(person.birthdate.getMonth() + 1).padStart(2, '0'),
		String(person.birthdate.getDate()).padStart(2, '0')
	].join('-');
	form.normalHeight.value = person.normalHeight;
	form.normalIntake.value = person.normalIntake;
	form.normalSatisfaction.value = person.normalSatisfaction;
	form.normalSleepHours.value = person.normalSleepHours;
	form.normalWeight.value = person.normalWeight;
	form.restingHeartRate.value = person.restingHeartRate;
	form.bloodType.value = person.bloodType;
	form.avgBurn.value = person.avgBurn;
	window.update();
};
window.generate = () => {
	let options = window.update(),
		person = mhealthgen.generate({ person: options, days: 365 });
	document.getElementById('data').textContent = JSON.stringify(person, null, 2);
	charts.forEach(chart => chart.render(person));
	document.getElementById('results').style.display = 'block';
};
window.tab = (id) => {
	Array.from(document.getElementsByClassName('tab')).forEach(el => {
		el.style.display = el.id === id ? 'block' : 'none';
	});
	Array.from(document.getElementById('tabs').children).forEach(el => {
		el.classList.toggle('active', el.id === `tab-${id}`);
	});
};

window.randomize();
window.tab('charts');

const createChart = options => {
	let series = [].concat(options.series), // make sure it's an array
		svg = d3.select('#charts').append('svg').attr('width', 880).attr('height', 140),
		margin = { top: 20, right: 20, bottom: 30, left: 50 },
		width = +svg.attr('width') - margin.left - margin.right,
		height = +svg.attr('height') - margin.top - margin.bottom,
		g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	let x = d3.scaleTime().rangeRound([0, width]);

	let y = d3.scaleLinear().rangeRound([height, 0]);

	let line = d3.line()
		.x(d => x(d.date))
		.y(d => y(d.value));

	let yAxis = g.append('g');
	yAxis.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('y', 6)
		.attr('dy', '0.71em')
		.attr('text-anchor', 'end')
		.text(options.title);

	let xAxis = g.append('g')
		.attr('transform', 'translate(0,' + height + ')');
	
	let paths = series.map(() => g.append('path').attr('class', 'line blue'));
	let avgpaths = series.map(() => g.append('path').attr('class', 'line black'));

	xAxis.select('.domain').remove();

	charts.push({
		render: person => {
			let datasets = series.map(fn => fn(person));
			x.domain([
				d3.min(datasets, data => d3.min(data, d => d.date)),
				d3.max(datasets, data => d3.max(data, d => d.date))
			]);
			let min = d3.min(datasets, data => d3.min(data, d => d.value)) * 0.9,
				max = d3.max(datasets, data => d3.max(data, d => d.value)) * 1.1;
			if (options.hasOwnProperty('min')) { min = Math.max(min, options.min); }
			if (options.hasOwnProperty('max')) { max = Math.min(max, options.max); }
			y.domain([min, max]);
			datasets.map((data, i) => {
				let vals = data.map(d => d.value),
					runningAvg = data.map((d, i) => ({
						date: d.date,
						value: avg(vals.slice(Math.max(0, i - 3), Math.max(data.length, i + 4))) // avg previous 10 results and next 10 results
					}));
				paths[i].datum(data).attr('d', line);
				avgpaths[i].datum(runningAvg).attr('d', line);
			});
			xAxis.call(d3.axisBottom(x));
			yAxis.call(d3.axisLeft(y));
		}
	});
};

createChart({
	title: 'Calorie intake (kcal)',
	series: person => person.nodes.filter(node => node.type === 'intake')
});

createChart({
	title: 'Calorie burn (kcal)',
	series: person => person.nodes.filter(node => node.type === 'caloric_burn')
});

createChart({
	title: 'Body weight (kg)',
	series: person => person.nodes.filter(node => node.type === 'weight')
});

createChart({
	title: 'Satisfaction',
	series: person => person.nodes.filter(node => node.type === 'satisfaction')
});

createChart({
	title: 'Sleep (hours)',
	series: person => person.nodes.filter(node => node.type === 'sleep')
});

createChart({
	title: 'Blood pressure',
	series: [
		person => person.nodes.filter(node => node.type === 'bp_systolic'),
		person => person.nodes.filter(node => node.type === 'bp_diastolic')
	]
});

createChart({
	title: 'Heart rate',
	series: person => person.nodes.filter(node => node.type === 'hr')
});

createChart({
	title: 'INR',
	series: person => person.nodes.filter(node => node.type === 'inr')
});
