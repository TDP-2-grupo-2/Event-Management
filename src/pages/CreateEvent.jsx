import { Paper, Grid, Typography, TextField, Box , Text} from "@mui/material";
import React , {useState, useEffect } from "react";
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';




const initialValues = {
    eventName: "",
    description: "",
}

export const CreateEvent = (props) => {
    console.log("entreeeee")
    const [values, setValues] =useState(initialValues)
  

    return (
        <div className="CreateEvent" style={{background: "rgba(137,152,202,255)"}}>
            <Typography gutterBottom variant="h3" align="center">
                Create Event
            </Typography>
            <Box display="flex"
                justifyContent="space-between"
                alignItems="center">
            <Box
                display="flex" 
                justifyContent="flex-start" 
                alignItems="justify-start" 
                >
                    
                    <Box
                        component="img"
                        sx={{
                        height: 'auto',
                        width: 350,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                        }}
                        alt="The house from the offer."
                        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgWFhYYGBgaGhwaGhgaGhgYGBoaGBwaGhoaGBocIS4lHB4rIRoaJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHBISGjQhISE0NDQ0NDQ0NDQ0NDE0NDQxNDQ0NDQ0NDQ0NDQ0NDQ/NDE1MTQ0NDQ0NDQ0NDE0MTQ0NP/AABEIAJcBTgMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAFBgMEAAIHAf/EADsQAAEDAgMFBgQDCAIDAAAAAAEAAhEDBAUhMRIiQVFxBjJhgZGhE8HR8EKx4RQWIzNDUpLxgsIHcqL/xAAaAQACAwEBAAAAAAAAAAAAAAAAAgEDBAUG/8QAKBEAAwACAgECBgIDAAAAAAAAAAECAxEhMRIEQQUTIjJRYYGhNHHB/9oADAMBAAIRAxEAPwBfwgbycqQ3Qk7CO8nOjoFdPRAKxk7pSU6pDj1TvjQ3SkO4dvHqloC6y+ACuWF4HPCXir+CHfChdgdNsDurTFDuraw7qixQbq1+wIQbo/xCiNsBCGXf8woha6LI+wCFmBthOOH6JMtO8E5WHdWjB0yUR4sd1c5xV8F2mq6Di53Vz/EWgudtaKzL9o4uXdQHQyqZaprpuy7IQDoPBQQsZWzFPRoueYaCeimw60D3Z6DXxTfhVBrdBHRV1XiWRj8hcZgFY/h9wrrOyVcnRsf+wTzb0AiNKn0VXzaNKwSc+/cyrBgtmcs9QtWdjq2c5cvFdOp0gsDAleWkN8mDkN/glWiJc3L1QlzSuu9pqH8IkcuS5Nc5OKux06XJnzQpfBpSYTorTHP5SqbSfRbtrO5j00VjKUMuHYi+kQ8eG7GvmnWndtrUw9vEZjLIxmMlzOzquLm56fJO9tdMDAQ1oJGZAiSMp9gqqkdMgv2wg9REb66lC31VZKFZG5RuWz3qNzkxBrUXlPUdV44rGFBB07sw/camtqT+ywOyE3tSDEdZTWyhrqW3QSWCoHqYqGoUEERWjgqV1e7Kgp4kDxUbG8HrZzrBu8nShoEmYMN5OVPQK5FINxs7pXPLo7x6roGNu3SkG6bvHqhgRMBKKYJTh4Q2m6EYwV8vEKF2MdEw/uhR4r3fJSWPdUOKu3VqXQHPrvvlXbV+Sp3PfKmZosldgFbN8vCdMP7qQ8M74T5h/dWnB9rJRBi/dK59fvALzyT/AIy7dK59etDnEHmrMnSGFS4qFziVoHKa8p7L3Dgq4csTEDeCaeaZ7JmaUMLuQwFxz5DmibcbrNM7EN6H81TUts046UpbH62pkt1UzXnIZlLWE9pR+KAUTffFrSRmCqXOnyaVSa2hjpUTCkaw8AucXWM1ycqpaOABIHQq/aXtyImo0zEGfeOKZxx2V/M56HDEKG2xzeJBjrwXH8ZtnU3lj2lpH36LqdhfueNl8bQ4gRPigvbfDg+jt/iZnPMJcdeNafuRlnynf4OZh0KZhadR5qJ49V6wic1rMZao1Ax0zkj9rdbbRAER5g9Dw+iXxTbtxqJ5+uaZWNYGjYAiInU5cyoGKtYqq4q3VCquCZCmkrwrF6FJBq4qS3EuHVRuU1iJe3qgDp/ZunDQmZqA4A2GhHgqmMiKvqpbZQ3GqmtUEkzioauhUrlDU0KCBWxsIdhrCAcyr+NvHEqrhhEFL7myftFjBO8nGloEo4Y7NOFm3dC1KeNnO3zoD453SkKu/ePVP/aIQ0rndcS49UlDIxyM9nTvBCqdsSj+A2UOChdhofbTuhVMWG6r9jS3VUxtkNPRakxjnlwd8qwxuSqVTvnqilszJZa7IJsMbvhPVgN1J9gzfTpYM3Vpw/aSgfjOhSBcnfPVdCxxsNK55cnfd1Vl9IYX8XaduTpGSoFMl0wOY4eBSy3VZLWmKwjZ7rQ6JRCjd1TsENa9pObMpjwkwJ8VYwmi0ta0jkmG3wJkyJHmYWeqSfJojG2uGBL/AAwN2XAtkgF2zIAdGbYJOh4g+SeLCx2rcAtExql2/t2texmg1TvahrWNAeNMhKqyVvo0Y58dnP7/AAcse5zg4ghwykbJIgHLlryW+D4UHNLXPc4kNAIBBaGzoNCTxLpXQHU2uyOvjx6FaCx9EK346B453sDWGHOpQC8uHjr6q7f24fTew6OaW+qvPaNBoq1w4NHgqG+dlmlo5ZaYG97y2DulwMDeOzPdHkh+J2Hwy0wQ10iDBII4TxyI910zB6r2H4jKYexzn7Tph7d6JiMwl3/yGxjAwD8Ty4dGtj/uFpjJTrRmvFMw2KlkzacBwnXT/SYWANaGgyOfVBMJYC7PRGXOWgymtQqs5bvco3FSiGROK8leleQjZB44q5hQmo1UXIhgo/iBAHV8FbuhGAhOD90Iq1VjENwc1Paqvcaqe1QBM5QVdCpnqGroUAI3aWpEqrgVaWlWu01JxBgSq2BUnBpyhJ7nQnXywPhOqbbZ5DUp4OyDmm2jBAWyX9JyWvqA+PuJBSSxkk9U74+N0pLpuzPVVUOgnSpgAI7hLd5BWHII1hTt5RPYw129SAhuOVZaVepGQhuNjdK0rogQHu3z1RmzOSBPO+eqKUKkBZ2AYsjvp0w9+6kLDKkvTzZDdWnD9pKKmP1N0hc6uTvHqn/GxkVz64O8eqsv2JI0DvLBzXEju6jw6o2oriiHN2Tpy58p8FTc+SA1wut3U84ZVBAkrm9qSxxYeBy/RH6WKhjMzrw+SwXD2acVpLk97Ul73vdOywFoYQRJjgR5kr2jdNdSYy4e8g5jYOzpzIzPRC23Aqu2qpLszDBoOsZo7buDgAbUubEDcfprzlMp0tEc020xrwTZFMNZU2wMmZyWjgCSZJRyjdSIOq52bqkwEsLqLxnBJLTGgM5t85Rjs5jZuBsuI228uOkqupaTaLppb0xluH5Jax29J3G8Rn4Ihil5sN5kpbuX7QLjrnOQmJPFVRO3tjVXGkHuz1N/wQQ6Gw7LKTvO4ngkPtpf/FuNkEFtNuwCNNqZdB48B/xV667Xvp0n27Gw9zQ1zzBgHflmch29H+ks2jNtzR69FfjhqnTM+XInKlBXCKQDNrifyVqoV5bUyxuySCJy8FrUKvRmZG4qJxW7lo5SQaStgVGV6CgDx6I4J/MCGvRLAv5gUMDrOEd0IoELwg7o6ImEgxBcaqxa6KpcHNWrXRBJM8qIrd5UaEQUbqwD1DRw0DgihWpKNE+b6OU4RvFNlFsAJWwrI5JlaTAWiftKH2CsfdkUjtO8eqccbnNJze8eqrodBmgMgjGG99C7cCB5Irhw30k9jMabfRDscdulX6ByQnHX7pWvfBAhE756opQZIQd74eeqvUrwAZrMwDWGUyHp6se6kDB7oOfkn6y7q1YegRRxs7pXPrhu8eqfcbdkUgVjvHqrLGNQ1ebK9lZtKrYFDFaOQcOBjyP6/mqLK0wjrmhwLTockv3Fuab9k6TIPMKi1zsnYYdasa8E7TeJhxA9RmEzWVxbGGvq1DlEfFqnyguiECw1gqtBdwygphsMGpFwJa0aKh1o143xwkWKeAWr8wwHrJ9Z1Qa9sjbVw9ghp1jICPBOzKDWANDglXHLtrnxqJg68848cj6KtOm+ScmmiK+xHbzJOoB8Onp7qqahfLOL4aMxMkmTHv5KtcXbGglumYz8phXOyVvtvdVcO6IaPLM/fNS9ShFtvQqXzC6tUIaSNtwBie6dkZ9AEUwy3AbMZq7cOzXlNXrozN8nlQKs9WHlQPUoUhK8ctnLRykgictZW5WpCANS5EMJJ2xCHOCLYAJqKGB1HBTuhGWoXhLYaETakHKtwc1atTkqdy7NWrR2SAJnlaArHlatQgZuVqQvZXqkU5Vgg5prY0QljA2pobwTpsRoH4rZbTSUiXFHZcQuq1KYc1IuNWm+TCpVN0yrFbdNFKhU0RfDasuQ1lLRE8Mo7yddmhjTbd1C8dG6UToaITjrt0rS+hDn1cbx6qNzl7cnePVb0qBKoHCvZnvrp1l3Vzvs/Rh66JZd1asL+kgG44N0rn9bvHqn/HTkUg1O8eqfJ7EkcLIW4C9hVEmUm5qHGqANMk6giDxzOYCn+IGjacYA1KX8SxE1HCMmg7o+Z8VXbJSNbS6LOJHRGLbtA8DXz8eaXDmvAqmkwVNdDN+8b5JJmevhn7Khd4iX5A8p5ZIW1uaM4dh097Pwy+aR6Q8uq4I7ak55iCfZPuG0RSoPjKGmfJqqYVh4kbIiOmQEwc9VH2jxQNZ8FmZPfPIa7PU8fDqqa3TSRfOoltgttMvpB4/DDag5GMndD+a1Y5EOytSHvHAhuR0zGYVzGcDLJfSEsOZaMyz6t/JWq9U5Y+b0r+WssLhrlf8AQA4qJy3co3qxGA0K1eFkrwlSgIyF5C2leSpII3or2f8A5nohLkX7PfzPRD6A6rhfdCItQ7DO6iLVWOULrvK3aDJVrgbyt22iANnleNKyoowVCBksrFrK9lMKc3wAJts7faSl2fTvhDwJlN7Cs2ubfZbKR8dO8V0HFao2FzfG3kvKpTSoqxx9T0Q0xoieHjeKG09AiFh3inl8l7QwUzkg+Od0ovQOSG4vT2gVob4IS2zn72S89URoU4C0dalpzV2i4QqPLYzTRcwgb6eLTuhJWGOG2nG2qANzK04qUzy9BMVT1K2Dsc0KRXje809YlUY+ZJjw+qBvuWMnYa1viO8fM5qvL6id/TydDB8Oy3zXC/sE08OeRJGwObsvbVRXRZTGpe7lo36qa6vieKE3DpVHzKr9HQn0GKF1t/sG4hcOec9OAGgVBwV+tTUbqMgplRizeme3pFIFT0qZdoomhT0HFpBCbRy0wxh2GzqPaU3YZhrWZujzgJew6/Y4QSGO8cgeh+Ss3+MbA2GOl5GozDR9VTU03o0TUythTHMabSaWU42zqRo3rzPh9lRY4uMkzKicCdVszd1+4VsypRVVu3yHuz7t954ZD0CcrWu4Gc0ldnjAz1Ofmf8Aaa6TiAseXmtnqMEawTL/AAXL2xo1RL2NniWjZd6tifOUFueyYcJo1R4NqD/s36Iq24H1XhqlufBRN0vcov0WO+1yJV/hFaid9jgP7hvN/wAhkPNUHLqFC9Ve6wS2rZlmw4/ipw3zLe6fRXznXujnZvh9TzLOakLUhOF92Oe3Om5tQcu6/wBDkfVL1S32CWuBaRqCCCOoKuVp9GC8dzxS0DXIz2dG+qZY1W8OqhjwRxUlejqmG91Xwl/CsQBaES/bAl8WNo3raq3bDJC/2iSrlO5AGqPFgWKiiCgqXzVE6/ajxYF6Vkoc7EmjUqB+O0xq4eqNECtgQTJTqFuYS1gTkxEZKV0IyO+vSRCWb0A5oniVXZlLtS7krPUvy2aY8VJdYNFfsRvIcx+iIWT95WT2VUGqRyUVxB1WNrNA1Q69v2jirb25DG0q5KGKMaAULwyydWdG2GDMAxtGekjJb3t0HcUOwm+2akjTaj5fJZkqmTf6eIzZVL6GqxbTpDSX8XOzz8BoFtXxGeKXr+4io9vDad7kn5qv8UqPF1y2d2MWOFqZ0E7q/JylC69c81Xe7PPiPv5Lx2euadTofe1wSB6je6VHsCcjHmfyOS2ATCbb7Ro5nNeMZmt3BeN1QI5QFLYJ81vtwFJXbm7wcfSZ+ahfSMT7K1Hlck6pr8M2mcyrNBpmR+ioMKICoA3IjJShSzTftDLzXlRug4uMeWUqjaVC121+E6/VXrY7b54AwOjf1KhvguwR55Jn8tByiIAIGY+80bsroEQ4wOfLwPyP2Q1LT5LZrjwKzVOz2XjwMj3AL2ldAnYdofvJAWV36ZmNOOXppqphSLwZe4EaZBuvSD78VV46Fc8F+s9zDBOXA8wrNvfTxQFjS2WjPU5y4n/KV7QqEhwkS3MQA0jwPNS5Ic7XI4W18ealvLejcCKrGuPB2jx0cM0vWNxtNGatNvI14JVtPgz5PTzfGgdf9kDt/wAGo0tIJh5IcPCWiDPPJLT2upvLXjZc0wQeCc6OIHefzOXRv6ylPtIT8XaP42gz6j5BacWSm9M5PrfRTijzn8nQex/aTD2Uw2tssqDUvYXyeYcAckcv+0OFFh36Ry/Cwh3lDZXDQzkV4WuVjn9nK8huf2jAcdmdmTszrHCVn7zuKTjKwEq3yYeQ3/vCSsOP+KUg53IrNl54FGw8g/d46Tog1a4c4ySVCKbuS9+G5K+SNjjgzoKZQ7JLDLhrNYUdz2kAEBKiGGcTptLTmlKrQ2XaqK6x5ztCUMqXb3eCPHknYcN21o1UTsZDdCgewTqV7stHJN4ojYRq4292hK0ZVe/mVQNw0KWjiexo33Tzr3As16T2NLiCAOPidEOsHwfNW6+JOqt2SIEz1hUmMLXeBVWRpvSOl6SXGr/LC95U/iOPM/ILwOyVa4fLp5gfkAp2aKpHdivJs1fz5L0r1wlRjh6HqMigZ8PRi3Wq2QGjVy8bqtitQFJGuSjWG+7qD7BRlS3Q3+oHzUFV0BXT0eW9VPjmpftmjaYI6u9gp7WkHNcI5x5L2mzIdFLa7sdUFBHRZuklXMKZp09ySfoo7lkNeBpII6O/WVcw5sD74ZJL6Ol8Ljyzp/hbCTV6wSVoXKPb8fqqD05dbdGmd7McxAW1PEWF0ic1VY+TJzVmnHLI+RUOURomuiw7wMEZzMZIbh1eXOnj09FLiD4aGgzPrA+/zQ20fsvBQlwLT5SD1jUiRyK8xO72QfFVqtQNzHFVMRq7WyOeaFPOxnpLYUsKu60eCpdo6Rcxj4nZcW/8XZj3HupbJ/09UZr0gaThEkCY6Z/JQn40jN63H54KX6/s5+HLdtUhGnW9N/gfviqlxg7hm3MffFbNHkCD9tyjZUZuDy917Rs6j3bDWOLuQCuswC5P9F//AMj5oAo/tB5BefHd4IqzszdH+kfNzfqpD2UueLGjq76BAAU1nLz4juaNDsxW4lg8z9F6OzL/AO9voUAB6129/GFH8HmVixSBo6Aon3HJYsUMCB9wSo3PK8WIA9aFtCxYgCyxkTHAfqtg6QsWKpnZx8JI3qOjZPkr7NFixKdH0/3V/BhCibx8vv1HuvViC3J2jZerFiBzFrCxYghlW+G83ofl9VQrmYHmsWK6ejzXr/8AIr+CVhMKdpWLExjJHVNPER6GfqiVpk0ffisWKrIdr4Ovqr/SJy7mo3O9FixVHeZgdyVinckZRI+9FixAI1vm7odzCoURvLFiF0JX3Is3Ls4UNQ5jwA9V6sUImgrhLNpw5N/NHH1QHBoWLFVXYzE68Pw6r2f2uy6HMexCntr0jT0Xqxb56R4vMkslJfljBguJta+dkT4iQiOLYrcRtU9iPEH6rFillYt1O110MiWA+DQoK3aa6eI2gOgAWLEoEBurl39Q+sfktfh1zrUP+RXixAH/2Q=="
                    />
                
            </Box>
            <Box
                sx={{
                p: 1,
                m: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(137,152,202,255)",
                borderRadius: 1,
                width:"40%",
                }}
      >
            <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <TextField label="Nombre Evento" 
                        placeholder="Ingresa el nombre del evento" 
                        variant="outlined" 
                        value= {values.eventName}/>
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <TextField label="Descripcion" 
                                    placeholder="Ingresa la descripcion del evento" 
                                    variant="outlined"  
                                    value={values.description}/>
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div>
                            <h3>Detalles del evento</h3>
                        </div>
                    </Grid>

                    <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopTimePicker label= "Hora inicio" defaultValue={dayjs('2022-04-17T15:30')} />
                        </LocalizationProvider>

                    </Grid>
                    <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopTimePicker label="Hora fin" defaultValue={dayjs('2022-04-17T15:30')} />
                        </LocalizationProvider>

                    </Grid>
                    <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                        <TextField
                            label="Capacidad"
                            type="number"
                            InputProps={{
                                inputProps: { min: 0 }
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Fecha" defaultValue={dayjs('2022-04-17')} />
                        </LocalizationProvider>

                    </Grid>
            </Grid>
        </Box>
      </Box>
                
        </div>

    );
   
    
};
