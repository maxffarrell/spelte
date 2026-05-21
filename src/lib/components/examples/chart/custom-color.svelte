<script lang="ts">
	import Chart from '$registry/spelte/chart.svelte';
	const chartData = [369, 438, 417, 448, 531, 673, 625, 575, 610, 701, 746, 964];
	const chartLabels = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
];
</script>

<Chart
    data={chartData}
    labels={chartLabels}
    color="#2563eb"
    name="Revenue"
/>
