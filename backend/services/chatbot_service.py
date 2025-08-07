import os
import pandas as pd
from langchain_experimental.agents.agent_toolkits import create_pandas_dataframe_agent
from langchain_openai import ChatOpenAI
from langchain.agents.agent_types import AgentType

csv_path = "data/sungshin_calendar_2025_2nd_semester.csv"

def get_calendar_response(question: str) -> str:
    os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY", "sk-...")  # 또는 .env로 관리

    df = pd.read_csv(csv_path)

    agent = create_pandas_dataframe_agent(
        ChatOpenAI(temperature=0, model='gpt-3.5-turbo'),
        df,
        verbose=False,
        agent_type=AgentType.OPENAI_FUNCTIONS,
        allow_dangerous_code=True,
    )

    result = agent.invoke({"input": question})
    return result["output"]
