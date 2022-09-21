import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function RadioButtonGroup({ options, value, onSelect }) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" style={{color:'#1acaca'}}>Gender</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={value}
        onChange={(event)=>onSelect(event.target.value)}
      >
        {options.map((item)=>(
            <FormControlLabel value={item.value} control={<Radio style={{color:'#1acaca'}}/>} label={item.label} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
