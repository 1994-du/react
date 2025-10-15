import demo1Audio from '@/assets/mp3/demo1.mp3';

export default function Audio() {
  return (
    <div>
      <audio src={demo1Audio} controls></audio>
    </div>
  );
}