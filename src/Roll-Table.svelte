<script>
    import { fly } from "svelte/transition";
</script>

<div in:fly="{{x: 100, duration: 2000}}" class="container">
  <h3 class="text-basic">Decision making table:</h3>
  <ul>
    <li>1: Do something incredibly stupid</li>
    <li>2-3: Act recklessly and take dangerous risks</li>
    <li>4-6: Act impulsively and make a hasty decision</li>
    <li>7-9: Act on a whim, regardless of consequences</li>
    <li>10-12: Let emotions guide your actions</li>
    <li>13-15: Consider short-term gains over long-term consequences</li>
    <li>16-18: Take a cautious approach, weigh the options before acting</li>
    <li>19: Make a rational, well-thought-out decision</li>
    <li>20: Do what you want to do.</li>
  </ul>
</div>

<style>
  .container {
  position: fixed;
  top: 153px;
  right: 0;
  background-color: var(--accent);
  padding: 20px;
  height: 500px;
  font-family: 'Arial', sans-serif;
  color: var(--dark);
  text-align: center;
}
h3 {
  font-size: 2.5em;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  font-size: 1.2em;
  line-height: 1.5em;
  margin-bottom: 10px;
  position: relative;
}
li:before {
  content: '';
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--primary-bg);
  transition: all 0.4s;
}
li:hover:before {
  background-color: var(--accent);
  border: 1px solid black;
}
li:first-child:before {
  background-color: var(--accent);
  content: '💀';
  font-size: 1.5em;
  line-height: 1.2em;
  text-align: center;
  width: 40px;
  height: 40px;
  left: -40px;
  top: 50%;
  transform: translateY(-50%) scale(1);
  color: white;
  font-weight: bold;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
}
li:first-child:hover::before {
  transform: translateY(-50%) scale(3);
  animation: wiggle 0.3s ease-in-out infinite;
  background-color: var(--error);
  border: none;
}
li:last-child {
  font-weight: bold;
}
li:last-child:before {
  background-color: var(--accent);
  content: '🎉';
  font-size: 1.5em;
  line-height: 1.2em;
  text-align: center;
  width: 40px;
  height: 40px;
  left: -40px;
  top: 50%;
  transform: translateY(-50%) scale(1);
  color: white;
  font-weight: bold;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
}
li:last-child:hover::before {
  transform: translateY(-50%) scale(3);
  animation: wiggle 0.3s ease-in-out infinite;
  background-color: gold;
  border: none;
}
@keyframes wiggle {
  0% {
    transform: translateY(-50%) scale(1.5) rotate(0deg);
  }
  25% {
    transform: translateY(-50%) scale(1.5) rotate(5deg);
  }
  50% {
    transform: translateY(-50%) scale(1.5) rotate(0deg);
  }
  75% {
    transform: translateY(-50%) scale(1.5) rotate(-5deg);
  }
  100% {
    transform: translateY(-50%) scale(1.5) rotate(0deg);
  }
}
</style>